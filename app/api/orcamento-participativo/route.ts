export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sanitizeString, sanitizeObject, isValidEmail, checkRateLimit, sanitizePagination } from "@/lib/sanitize";

const CATEGORIAS_VALIDAS = ["educacao", "saude", "infraestrutura", "cultura", "esporte", "meio_ambiente", "seguranca", "assistencia_social"];

/**
 * GET /api/orcamento-participativo
 * Lista propostas abertas para votação (público)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const categoria = searchParams.get("categoria");
    const status = searchParams.get("status") || "ABERTA_VOTACAO";
    const ordenar = searchParams.get("ordenar") || "votos"; // "votos" | "recente"
    const { page, limit, skip } = sanitizePagination(
      searchParams.get("page") || "1",
      searchParams.get("limit") || "20"
    );

    const where: any = {};
    if (categoria && CATEGORIAS_VALIDAS.includes(categoria)) {
      where.categoria = categoria;
    }
    if (status) {
      where.status = status;
    }

    const [propostas, total] = await Promise.all([
      prisma.propostaOrcamentaria.findMany({
        where,
        orderBy: ordenar === "votos" ? { totalVotos: "desc" } : { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          _count: { select: { votos: true } },
        },
      }),
      prisma.propostaOrcamentaria.count({ where }),
    ]);

    // Estatísticas gerais
    const stats = await prisma.propostaOrcamentaria.aggregate({
      where: { status: "ABERTA_VOTACAO" },
      _count: true,
      _sum: { totalVotos: true },
    });

    return NextResponse.json({
      propostas,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      stats: {
        totalPropostas: stats._count,
        totalVotos: stats._sum.totalVotos || 0,
      },
    });
  } catch (error) {
    console.error("Erro ao listar propostas:", error);
    return NextResponse.json({ error: "Erro ao buscar propostas" }, { status: 500 });
  }
}

/**
 * POST /api/orcamento-participativo
 * Criar nova proposta (cidadão)
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rateCheck = checkRateLimit(`proposta:${ip}`, 5, 3600000); // 5 propostas por hora
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Limite de propostas atingido. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { titulo, descricao, categoria, valorEstimado, bairro, autorNome, autorEmail } = body;

    // Validações
    if (!titulo || !descricao || !categoria || !autorNome || !autorEmail) {
      return NextResponse.json(
        { error: "Título, descrição, categoria, nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    if (!isValidEmail(autorEmail)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (!CATEGORIAS_VALIDAS.includes(categoria)) {
      return NextResponse.json(
        { error: `Categoria inválida. Válidas: ${CATEGORIAS_VALIDAS.join(", ")}` },
        { status: 400 }
      );
    }

    const sanitized = sanitizeObject({ titulo, descricao, bairro: bairro || "", autorNome });

    if (sanitized.titulo.length < 10 || sanitized.titulo.length > 200) {
      return NextResponse.json(
        { error: "Título deve ter entre 10 e 200 caracteres" },
        { status: 400 }
      );
    }
    if (sanitized.descricao.length < 50 || sanitized.descricao.length > 2000) {
      return NextResponse.json(
        { error: "Descrição deve ter entre 50 e 2000 caracteres" },
        { status: 400 }
      );
    }

    const proposta = await prisma.propostaOrcamentaria.create({
      data: {
        titulo: sanitized.titulo,
        descricao: sanitized.descricao,
        categoria,
        valorEstimado: valorEstimado ? parseFloat(valorEstimado) : null,
        bairro: sanitized.bairro || null,
        autorNome: sanitized.autorNome,
        autorEmail: sanitizeString(autorEmail).toLowerCase(),
        status: "ABERTA_VOTACAO",
      },
    });

    // Registrar/atualizar cidadão participante e dar pontos
    const cidadao = await prisma.cidadaoParticipante.upsert({
      where: { email: sanitizeString(autorEmail).toLowerCase() },
      update: { pontos: { increment: 10 } }, // 10 pontos por proposta
      create: {
        nome: sanitized.autorNome,
        email: sanitizeString(autorEmail).toLowerCase(),
        pontos: 10,
      },
    });

    // Atualizar nível
    await updateNivel(cidadao.id, cidadao.pontos + 10);

    return NextResponse.json(
      {
        message: "Proposta criada com sucesso! Ela já está aberta para votação.",
        proposta,
        pontosGanhos: 10,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar proposta:", error);
    return NextResponse.json({ error: "Erro ao criar proposta" }, { status: 500 });
  }
}

async function updateNivel(cidadaoId: string, pontos: number) {
  let nivel = "Cidadão Iniciante";
  if (pontos >= 100) nivel = "Cidadão Engajado";
  if (pontos >= 250) nivel = "Cidadão Ativo";
  if (pontos >= 500) nivel = "Cidadão Destaque";
  if (pontos >= 1000) nivel = "Líder Comunitário";

  await prisma.cidadaoParticipante.update({
    where: { id: cidadaoId },
    data: { nivel },
  });
}
