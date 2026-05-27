export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";
import { sanitizeString } from "@/lib/sanitize";

/**
 * POST /api/protocolos/[id]/tramitar
 * Tramitar protocolo entre secretarias (admin)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;

    const body = await req.json();
    const { paraSecretariaId, observacao } = body;

    if (!paraSecretariaId) {
      return NextResponse.json(
        { error: "Secretaria de destino é obrigatória" },
        { status: 400 }
      );
    }

    const protocolo = await prisma.protocolo.findUnique({
      where: { id: params.id },
    });
    if (!protocolo) {
      return NextResponse.json({ error: "Protocolo não encontrado" }, { status: 404 });
    }

    // Buscar nomes das secretarias
    const [secOrigem, secDestino] = await Promise.all([
      protocolo.secretariaAtualId
        ? prisma.secretaria.findUnique({ where: { id: protocolo.secretariaAtualId }, select: { nome: true } })
        : null,
      prisma.secretaria.findUnique({ where: { id: paraSecretariaId }, select: { nome: true } }),
    ]);

    if (!secDestino) {
      return NextResponse.json({ error: "Secretaria de destino não encontrada" }, { status: 404 });
    }

    // Fechar tramitação anterior e criar nova
    await prisma.$transaction([
      // Fechar última tramitação
      prisma.tramitacao.updateMany({
        where: {
          protocoloId: params.id,
          dataSaida: null,
        },
        data: { dataSaida: new Date() },
      }),
      // Nova tramitação
      prisma.tramitacao.create({
        data: {
          protocoloId: params.id,
          deSecretariaId: protocolo.secretariaAtualId,
          paraSecretariaId,
          deSecretaria: secOrigem?.nome || null,
          paraSecretaria: secDestino.nome,
          observacao: observacao ? sanitizeString(observacao) : null,
          responsavel: authResult.session.user.name,
        },
      }),
      // Atualizar protocolo
      prisma.protocolo.update({
        where: { id: params.id },
        data: {
          secretariaAtualId: paraSecretariaId,
          status: "EM_TRAMITACAO",
        },
      }),
    ]);

    return NextResponse.json({
      message: `Protocolo tramitado para ${secDestino.nome}`,
    });
  } catch (error) {
    console.error("Erro ao tramitar:", error);
    return NextResponse.json({ error: "Erro ao tramitar protocolo" }, { status: 500 });
  }
}
