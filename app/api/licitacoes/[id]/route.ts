export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const licitacao = await prisma.licitacao.findUnique({
      where: { id: params.id },
      include: { secretaria: true }
    });
    if (!licitacao) {
      return NextResponse.json({ error: "Licitação não encontrada" }, { status: 404 });
    }
    return NextResponse.json(licitacao);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar licitação" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = session.user as any;
    const existing = await prisma.licitacao.findUnique({ where: { id: params.id } });
    
    if (!existing) {
      return NextResponse.json({ error: "Licitação não encontrada" }, { status: 404 });
    }

    // Verifica permissão
    if (user.role === "SECRETARIO" && existing.secretariaId !== user.secretariaId) {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const body = await req.json();
    const licitacao = await prisma.licitacao.update({
      where: { id: params.id },
      data: {
        numero: body.numero,
        modalidade: body.modalidade,
        objeto: body.objeto,
        valorEstimado: body.valorEstimado ? parseFloat(body.valorEstimado) : null,
        dataAbertura: new Date(body.dataAbertura),
        dataEncerramento: body.dataEncerramento ? new Date(body.dataEncerramento) : null,
        status: body.status,
        editalUrl: body.editalUrl,
        secretariaId: body.secretariaId
      }
    });

    return NextResponse.json(licitacao);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar licitação" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await prisma.licitacao.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Licitação excluída" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir licitação" }, { status: 500 });
  }
}
