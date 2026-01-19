export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  try {
    const licitacoes = await prisma.licitacao.findMany({
      orderBy: { dataAbertura: "desc" },
      include: { secretaria: true }
    });
    return NextResponse.json(licitacoes);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar licitações" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = session.user as any;
    if (user.role !== "ADMIN" && user.role !== "SECRETARIO") {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const body = await req.json();
    
    // Secretário só pode criar para sua secretaria
    if (user.role === "SECRETARIO" && body.secretariaId !== user.secretariaId) {
      return NextResponse.json({ error: "Sem permissão para esta secretaria" }, { status: 403 });
    }

    const licitacao = await prisma.licitacao.create({
      data: {
        numero: body.numero,
        modalidade: body.modalidade,
        objeto: body.objeto,
        descricaoDetalhada: body.descricaoDetalhada || null,
        valorEstimado: body.valorEstimado ? parseFloat(body.valorEstimado) : null,
        dataAbertura: new Date(body.dataAbertura),
        dataEncerramento: body.dataEncerramento ? new Date(body.dataEncerramento) : null,
        status: body.status ?? "ABERTA",
        editalUrl: body.editalUrl || null,
        contactoPessoa: body.contactoPessoa || null,
        contactoEmail: body.contactoEmail || null,
        contactoTelefone: body.contactoTelefone || null,
        local: body.local || null,
        secretariaId: body.secretariaId || null
      },
      include: { secretaria: true }
    });

    return NextResponse.json(licitacao, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar licitação:", error);
    return NextResponse.json({ error: "Erro ao criar licitação", details: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
  }
}
