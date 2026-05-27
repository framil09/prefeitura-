export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sanitizeObject, isValidEmail, checkRateLimit, sanitizePagination } from "@/lib/sanitize";
import { requireAuth } from "@/lib/api-auth";

function generateProtocolNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 999999).toString().padStart(6, "0");
  return `PROT-${year}-${rand}`;
}

/**
 * GET /api/protocolos
 * Admin: Lista todos os protocolos
 * Público: Consulta por número de protocolo
 */
export async function GET(req: NextRequest) {
  try {
    const numero = req.nextUrl.searchParams.get("numero");

    // Consulta pública por número de protocolo
    if (numero) {
      const protocolo = await prisma.protocolo.findUnique({
        where: { numero },
        include: {
          tramitacoes: { orderBy: { dataEntrada: "asc" } },
        },
      });
      if (!protocolo) {
        return NextResponse.json({ error: "Protocolo não encontrado" }, { status: 404 });
      }
      // Retornar apenas dados públicos
      return NextResponse.json({
        protocolo: {
          numero: protocolo.numero,
          titulo: protocolo.titulo,
          tipo: protocolo.tipo,
          status: protocolo.status,
          prioridade: protocolo.prioridade,
          createdAt: protocolo.createdAt,
          tramitacoes: protocolo.tramitacoes.map((t) => ({
            deSecretaria: t.deSecretaria,
            paraSecretaria: t.paraSecretaria,
            observacao: t.observacao,
            dataEntrada: t.dataEntrada,
            dataSaida: t.dataSaida,
          })),
        },
      });
    }

    // Admin: listar todos
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;

    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status");
    const secretariaId = searchParams.get("secretariaId");
    const { page, limit, skip } = sanitizePagination(
      searchParams.get("page") || "1",
      searchParams.get("limit") || "20"
    );

    const where: any = {};
    if (status) where.status = status;
    if (secretariaId) where.secretariaAtualId = secretariaId;

    const [protocolos, total] = await Promise.all([
      prisma.protocolo.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          tramitacoes: { orderBy: { dataEntrada: "desc" }, take: 1 },
        },
      }),
      prisma.protocolo.count({ where }),
    ]);

    // Stats
    const stats = await prisma.protocolo.groupBy({
      by: ["status"],
      _count: true,
    });

    return NextResponse.json({
      protocolos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      stats: Object.fromEntries(stats.map((s) => [s.status, s._count])),
    });
  } catch (error) {
    console.error("Erro ao listar protocolos:", error);
    return NextResponse.json({ error: "Erro ao buscar protocolos" }, { status: 500 });
  }
}

/**
 * POST /api/protocolos
 * Criar novo protocolo (público ou admin)
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rateCheck = checkRateLimit(`protocolo:${ip}`, 10, 3600000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Limite de protocolos atingido. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { titulo, descricao, tipo, prioridade, secretariaId, solicitanteNome, solicitanteEmail, solicitanteTel } = body;

    if (!titulo || !descricao || !tipo || !solicitanteNome || !solicitanteEmail) {
      return NextResponse.json(
        { error: "Título, descrição, tipo, nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    if (!isValidEmail(solicitanteEmail)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const tiposValidos = ["reclamacao", "solicitacao", "sugestao", "denuncia", "informacao"];
    if (!tiposValidos.includes(tipo)) {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    const sanitized = sanitizeObject({ titulo, descricao, solicitanteNome });
    const numero = generateProtocolNumber();

    // Buscar nome da secretaria se fornecido
    let secretariaNome = null;
    if (secretariaId) {
      const sec = await prisma.secretaria.findUnique({
        where: { id: secretariaId },
        select: { nome: true },
      });
      secretariaNome = sec?.nome || null;
    }

    const protocolo = await prisma.protocolo.create({
      data: {
        numero,
        titulo: sanitized.titulo,
        descricao: sanitized.descricao,
        tipo,
        prioridade: prioridade || "normal",
        secretariaAtualId: secretariaId || null,
        solicitanteNome: sanitized.solicitanteNome,
        solicitanteEmail: solicitanteEmail.toLowerCase(),
        solicitanteTel: solicitanteTel || null,
        tramitacoes: {
          create: {
            paraSecretariaId: secretariaId || null,
            paraSecretaria: secretariaNome,
            observacao: "Protocolo aberto pelo cidadão",
            responsavel: "Sistema",
          },
        },
      },
      include: { tramitacoes: true },
    });

    return NextResponse.json(
      {
        message: "Protocolo criado com sucesso!",
        protocolo: {
          numero: protocolo.numero,
          status: protocolo.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar protocolo:", error);
    return NextResponse.json({ error: "Erro ao criar protocolo" }, { status: 500 });
  }
}
