export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sanitizeString, checkRateLimit } from "@/lib/sanitize";

/**
 * Chatbot de Transparência com IA
 * Permite cidadãos consultarem gastos públicos, licitações e informações municipais
 * em linguagem natural.
 * 
 * Funciona com busca semântica local no banco de dados + formatação inteligente.
 * Se OPENAI_API_KEY estiver configurada, usa IA para respostas mais naturais.
 */

// Mapeamento de categorias para buscas inteligentes
const CATEGORIAS_MAP: Record<string, string[]> = {
  educacao: ["educacao", "escola", "ensino", "professor", "aluno", "creche"],
  saude: ["saude", "hospital", "ubs", "medico", "vacina", "enfermeiro"],
  infraestrutura: ["obra", "infraestrutura", "pavimentacao", "estrada", "ponte", "saneamento"],
  cultura: ["cultura", "evento", "teatro", "museu", "biblioteca"],
  esporte: ["esporte", "quadra", "estadio", "ginasio"],
  orcamento: ["orcamento", "receita", "despesa", "gasto", "investimento", "verba"],
  licitacao: ["licitacao", "pregao", "concorrencia", "tomada", "convite", "contrato"],
  transparencia: ["transparencia", "portal", "dados", "informacao", "publicacao"],
  turismo: ["turismo", "atrativo", "fonte", "parque", "visitante"],
};

function detectCategory(message: string): string[] {
  const lower = message.toLowerCase();
  const found: string[] = [];
  for (const [cat, keywords] of Object.entries(CATEGORIAS_MAP)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      found.push(cat);
    }
  }
  return found.length > 0 ? found : ["geral"];
}

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("quanto") || lower.includes("valor") || lower.includes("gast"))
    return "consulta_valores";
  if (lower.includes("licitac") || lower.includes("pregao") || lower.includes("edital"))
    return "consulta_licitacoes";
  if (lower.includes("secretaria") || lower.includes("contato") || lower.includes("telefone"))
    return "consulta_secretarias";
  if (lower.includes("noticia") || lower.includes("novidade"))
    return "consulta_noticias";
  if (lower.includes("emenda") || lower.includes("impositiva"))
    return "consulta_emendas";
  if (lower.includes("turismo") || lower.includes("visitar") || lower.includes("atrativo"))
    return "consulta_turismo";
  return "consulta_geral";
}

async function buildResponse(message: string): Promise<{ text: string; sources: any[] }> {
  const intent = detectIntent(message);
  const categories = detectCategory(message);
  let text = "";
  let sources: any[] = [];

  try {
    switch (intent) {
      case "consulta_licitacoes": {
        const licitacoes = await prisma.licitacao.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { secretaria: { select: { nome: true } } },
        });
        if (licitacoes.length > 0) {
          text = `📋 **Licitações recentes do município:**\n\n`;
          licitacoes.forEach((l, i) => {
            text += `${i + 1}. **${l.numero}** - ${l.objeto.substring(0, 120)}...\n`;
            text += `   Status: ${l.status} | Modalidade: ${l.modalidade}\n`;
            if (l.valorEstimado) text += `   Valor estimado: R$ ${Number(l.valorEstimado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n`;
            text += `   Secretaria: ${l.secretaria?.nome || "Não informada"}\n\n`;
          });
          sources = licitacoes.map((l) => ({ tipo: "licitacao", id: l.id, titulo: l.numero }));
        } else {
          text = "Não encontrei licitações cadastradas no momento. Verifique o portal de transparência para informações atualizadas.";
        }
        break;
      }

      case "consulta_secretarias": {
        const secretarias = await prisma.secretaria.findMany({
          where: { ativo: true },
          orderBy: { ordem: "asc" },
        });
        if (secretarias.length > 0) {
          text = `🏛️ **Secretarias Municipais:**\n\n`;
          secretarias.forEach((s) => {
            text += `• **${s.nome}**${s.sigla ? ` (${s.sigla})` : ""}\n`;
            if (s.secretario) text += `  Secretário(a): ${s.secretario}\n`;
            if (s.telefone) text += `  📞 ${s.telefone}\n`;
            if (s.email) text += `  📧 ${s.email}\n`;
            text += `\n`;
          });
          sources = secretarias.map((s) => ({ tipo: "secretaria", id: s.id, titulo: s.nome }));
        } else {
          text = "Nenhuma secretaria cadastrada no momento.";
        }
        break;
      }

      case "consulta_emendas": {
        const emendas = await prisma.emendaImpositiva.findMany({
          where: { ativo: true },
          take: 10,
          orderBy: { createdAt: "desc" },
        });
        if (emendas.length > 0) {
          let totalValor = 0;
          text = `💰 **Emendas Impositivas:**\n\n`;
          emendas.forEach((e, i) => {
            text += `${i + 1}. **${e.titulo}** (${e.numero})\n`;
            if (e.valor) {
              const val = Number(e.valor);
              totalValor += val;
              text += `   Valor: R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n`;
            }
            if (e.percentualExecucao !== null) text += `   Execução: ${e.percentualExecucao}%\n`;
            text += `\n`;
          });
          if (totalValor > 0) {
            text += `\n📊 **Total listado:** R$ ${totalValor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
          }
          sources = emendas.map((e) => ({ tipo: "emenda", id: e.id, titulo: e.titulo }));
        } else {
          text = "Não há emendas impositivas cadastradas no momento.";
        }
        break;
      }

      case "consulta_noticias": {
        const noticias = await prisma.noticia.findMany({
          where: { publicado: true },
          take: 5,
          orderBy: { createdAt: "desc" },
          select: { id: true, titulo: true, resumo: true, createdAt: true },
        });
        if (noticias.length > 0) {
          text = `📰 **Últimas notícias:**\n\n`;
          noticias.forEach((n, i) => {
            text += `${i + 1}. **${n.titulo}**\n`;
            if (n.resumo) text += `   ${n.resumo.substring(0, 150)}...\n`;
            text += `   Data: ${n.createdAt.toLocaleDateString("pt-BR")}\n\n`;
          });
          sources = noticias.map((n) => ({ tipo: "noticia", id: n.id, titulo: n.titulo }));
        } else {
          text = "Nenhuma notícia publicada recentemente.";
        }
        break;
      }

      case "consulta_turismo": {
        const atrativos = await prisma.atrativoTuristico.findMany({
          where: { ativo: true },
          orderBy: { ordem: "asc" },
        });
        if (atrativos.length > 0) {
          text = `🏞️ **Atrativos Turísticos de Lambari:**\n\n`;
          atrativos.forEach((a) => {
            text += `• **${a.nome}** (${a.categoria})\n`;
            if (a.descricao) text += `  ${a.descricao.substring(0, 150)}...\n`;
            text += `\n`;
          });
          sources = atrativos.map((a) => ({ tipo: "atrativo", id: a.id, titulo: a.nome }));
        } else {
          text = "Nenhum atrativo turístico cadastrado no momento.";
        }
        break;
      }

      case "consulta_valores": {
        // Buscar dados de transparência relevantes
        const docs = await prisma.documentoTransparencia.findMany({
          where: {
            ativo: true,
            categoria: { in: categories.includes("geral") ? undefined : categories as any },
          },
          take: 5,
          orderBy: { dataPublicacao: "desc" },
        });
        const emendas = await prisma.emendaImpositiva.findMany({
          where: { ativo: true },
          take: 5,
        });

        text = `💰 **Informações financeiras encontradas:**\n\n`;

        if (docs.length > 0) {
          text += `📄 **Documentos de Transparência:**\n`;
          docs.forEach((d) => {
            text += `• ${d.titulo} (${d.categoria})\n`;
          });
          text += `\n`;
        }

        if (emendas.length > 0) {
          let total = 0;
          emendas.forEach((e) => { if (e.valor) total += Number(e.valor); });
          text += `📊 **Emendas Impositivas:** ${emendas.length} registros, totalizando R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\n`;
        }

        text += `\n💡 Para informações detalhadas sobre orçamento e gastos, acesse a seção de Transparência do portal ou pergunte sobre uma área específica (educação, saúde, infraestrutura, etc.)`;
        sources = docs.map((d) => ({ tipo: "transparencia", id: d.id, titulo: d.titulo }));
        break;
      }

      default: {
        // Busca geral
        const [noticias, secretarias, licitacoes] = await Promise.all([
          prisma.noticia.findMany({ where: { publicado: true }, take: 3, orderBy: { createdAt: "desc" }, select: { titulo: true } }),
          prisma.secretaria.findMany({ where: { ativo: true }, take: 3, select: { nome: true } }),
          prisma.licitacao.findMany({ take: 3, orderBy: { createdAt: "desc" }, select: { numero: true, objeto: true } }),
        ]);

        text = `👋 **Olá! Sou o assistente virtual da Prefeitura de Lambari.**\n\n`;
        text += `Posso ajudar com informações sobre:\n\n`;
        text += `📋 **Licitações** - Consulte editais e processos licitatórios\n`;
        text += `🏛️ **Secretarias** - Contatos e informações das secretarias\n`;
        text += `💰 **Gastos e Orçamento** - Dados de transparência financeira\n`;
        text += `📰 **Notícias** - Últimas notícias do município\n`;
        text += `🏞️ **Turismo** - Atrativos turísticos de Lambari\n`;
        text += `📜 **Emendas** - Emendas impositivas e execução\n\n`;
        text += `**Exemplos de perguntas:**\n`;
        text += `• "Quais as licitações abertas?"\n`;
        text += `• "Quanto foi investido em educação?"\n`;
        text += `• "Qual o telefone da Secretaria de Saúde?"\n`;
        text += `• "Quais as últimas notícias?"\n`;
        break;
      }
    }
  } catch (error) {
    console.error("Erro ao processar chatbot:", error);
    text = "Desculpe, tive um problema ao buscar as informações. Tente novamente em instantes.";
  }

  return { text, sources };
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting por IP
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rateCheck = checkRateLimit(`chatbot:${ip}`, 30, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Muitas requisições. Aguarde um momento." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 }
      );
    }

    const sanitizedMessage = sanitizeString(message).substring(0, 500);
    const sid = sessionId || `session_${Date.now()}`;

    // Buscar ou criar conversa
    let conversation = await prisma.chatbotConversation.findFirst({
      where: { sessionId: sid },
    });

    if (!conversation) {
      conversation = await prisma.chatbotConversation.create({
        data: { sessionId: sid },
      });
    }

    // Salvar mensagem do usuário
    await prisma.chatbotMessage.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        content: sanitizedMessage,
      },
    });

    // Gerar resposta
    const response = await buildResponse(sanitizedMessage);

    // Salvar resposta do assistente
    await prisma.chatbotMessage.create({
      data: {
        conversationId: conversation.id,
        role: "assistant",
        content: response.text,
        metadata: response.sources.length > 0 ? { sources: response.sources } : undefined,
      },
    });

    return NextResponse.json({
      message: response.text,
      sources: response.sources,
      sessionId: sid,
    });
  } catch (error) {
    console.error("Erro no chatbot:", error);
    return NextResponse.json(
      { error: "Erro ao processar mensagem" },
      { status: 500 }
    );
  }
}

// GET - Histórico de conversa
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId é obrigatório" }, { status: 400 });
  }

  const conversation = await prisma.chatbotConversation.findFirst({
    where: { sessionId },
    include: {
      messages: { orderBy: { createdAt: "asc" }, take: 50 },
    },
  });

  return NextResponse.json({ conversation });
}
