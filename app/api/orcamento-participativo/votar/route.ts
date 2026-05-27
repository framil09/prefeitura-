export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sanitizeString, isValidEmail, checkRateLimit } from "@/lib/sanitize";

const BADGES_CONFIG = [
  { votosNecessarios: 1, tipo: "primeiro_voto", titulo: "Primeiro Voto", descricao: "Participou da sua primeira votação!", icone: "🗳️" },
  { votosNecessarios: 5, tipo: "5_votos", titulo: "Cidadão Participativo", descricao: "Votou em 5 propostas!", icone: "⭐" },
  { votosNecessarios: 10, tipo: "10_votos", titulo: "Cidadão Exemplar", descricao: "Votou em 10 propostas!", icone: "🏆" },
  { votosNecessarios: 25, tipo: "25_votos", titulo: "Defensor da Democracia", descricao: "Votou em 25 propostas!", icone: "🎖️" },
];

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rateCheck = checkRateLimit(`voto:${ip}`, 30, 3600000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Limite de votos atingido. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { propostaId, nome, email } = body;

    if (!propostaId || !nome || !email) {
      return NextResponse.json(
        { error: "propostaId, nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Verificar se proposta existe e está aberta
    const proposta = await prisma.propostaOrcamentaria.findUnique({
      where: { id: propostaId },
    });
    if (!proposta || proposta.status !== "ABERTA_VOTACAO") {
      return NextResponse.json(
        { error: "Proposta não encontrada ou não está aberta para votação" },
        { status: 404 }
      );
    }

    // Registrar/buscar cidadão
    const cidadao = await prisma.cidadaoParticipante.upsert({
      where: { email: sanitizeString(email).toLowerCase() },
      update: {},
      create: {
        nome: sanitizeString(nome),
        email: sanitizeString(email).toLowerCase(),
        pontos: 0,
      },
    });

    // Verificar se já votou
    const votoExistente = await prisma.votoProposta.findUnique({
      where: { propostaId_cidadaoId: { propostaId, cidadaoId: cidadao.id } },
    });
    if (votoExistente) {
      return NextResponse.json(
        { error: "Você já votou nesta proposta" },
        { status: 409 }
      );
    }

    // Registrar voto + atualizar contador + dar pontos
    const [voto] = await prisma.$transaction([
      prisma.votoProposta.create({
        data: { propostaId, cidadaoId: cidadao.id },
      }),
      prisma.propostaOrcamentaria.update({
        where: { id: propostaId },
        data: { totalVotos: { increment: 1 } },
      }),
      prisma.cidadaoParticipante.update({
        where: { id: cidadao.id },
        data: { pontos: { increment: 5 } },
      }),
    ]);

    // Verificar badges
    const totalVotosCidadao = await prisma.votoProposta.count({
      where: { cidadaoId: cidadao.id },
    });

    const newBadges: any[] = [];
    for (const badge of BADGES_CONFIG) {
      if (totalVotosCidadao >= badge.votosNecessarios) {
        try {
          const created = await prisma.badgeCidadao.create({
            data: {
              cidadaoId: cidadao.id,
              tipo: badge.tipo,
              titulo: badge.titulo,
              descricao: badge.descricao,
              icone: badge.icone,
            },
          });
          newBadges.push(created);
        } catch {
          // Badge já existe, ignorar
        }
      }
    }

    // Atualizar nível
    const updatedCidadao = await prisma.cidadaoParticipante.findUnique({
      where: { id: cidadao.id },
    });
    let nivel = "Cidadão Iniciante";
    const pontos = updatedCidadao?.pontos || 0;
    if (pontos >= 100) nivel = "Cidadão Engajado";
    if (pontos >= 250) nivel = "Cidadão Ativo";
    if (pontos >= 500) nivel = "Cidadão Destaque";
    if (pontos >= 1000) nivel = "Líder Comunitário";

    await prisma.cidadaoParticipante.update({
      where: { id: cidadao.id },
      data: { nivel },
    });

    return NextResponse.json({
      message: "Voto registrado com sucesso!",
      pontosGanhos: 5,
      totalPontos: pontos,
      nivel,
      novasBadges: newBadges,
      totalVotosProposta: proposta.totalVotos + 1,
    });
  } catch (error) {
    console.error("Erro ao votar:", error);
    return NextResponse.json({ error: "Erro ao registrar voto" }, { status: 500 });
  }
}
