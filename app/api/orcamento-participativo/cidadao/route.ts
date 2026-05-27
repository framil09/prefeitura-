export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/orcamento-participativo/cidadao?email=xxx
 * Retorna perfil do cidadão com badges e ranking
 */
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
    }

    const cidadao = await prisma.cidadaoParticipante.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        badges: { orderBy: { conqueredAt: "desc" } },
        votos: {
          include: {
            proposta: { select: { id: true, titulo: true, categoria: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!cidadao) {
      return NextResponse.json({ error: "Cidadão não encontrado" }, { status: 404 });
    }

    // Calcular ranking
    const ranking = await prisma.cidadaoParticipante.count({
      where: { pontos: { gt: cidadao.pontos } },
    });

    // Leaderboard top 10
    const leaderboard = await prisma.cidadaoParticipante.findMany({
      take: 10,
      orderBy: { pontos: "desc" },
      select: { id: true, nome: true, pontos: true, nivel: true },
    });

    return NextResponse.json({
      cidadao: {
        id: cidadao.id,
        nome: cidadao.nome,
        pontos: cidadao.pontos,
        nivel: cidadao.nivel,
        badges: cidadao.badges,
        totalVotos: cidadao.votos.length,
        votosRecentes: cidadao.votos,
      },
      ranking: ranking + 1,
      leaderboard,
    });
  } catch (error) {
    console.error("Erro ao buscar cidadão:", error);
    return NextResponse.json({ error: "Erro ao buscar perfil" }, { status: 500 });
  }
}
