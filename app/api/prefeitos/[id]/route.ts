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
    const prefeito = await prisma.prefeito.findUnique({
      where: { id: params.id }
    });
    if (!prefeito) {
      return NextResponse.json({ error: "Prefeito não encontrado" }, { status: 404 });
    }
    return NextResponse.json(prefeito);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar prefeito" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const existing = await prisma.prefeito.findUnique({ where: { id: params.id } });

    if (!existing) {
      return NextResponse.json({ error: "Prefeito não encontrado" }, { status: 404 });
    }

    const body = await req.json();
    const prefeito = await prisma.prefeito.update({
      where: { id: params.id },
      data: {
        nome: body.nome,
        partido: body.partido || null,
        ano_inicio: body.ano_inicio,
        ano_fim: body.ano_fim || null,
        foto: body.foto || null,
        descricao: body.descricao || null,
        destaque: body.destaque,
        ativo: body.ativo,
        ordem: body.ordem
      }
    });

    return NextResponse.json(prefeito);
  } catch (error) {
    console.error("Erro ao atualizar prefeito:", error);
    return NextResponse.json({ error: "Erro ao atualizar prefeito" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const existing = await prisma.prefeito.findUnique({ where: { id: params.id } });

    if (!existing) {
      return NextResponse.json({ error: "Prefeito não encontrado" }, { status: 404 });
    }

    await prisma.prefeito.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Prefeito excluído" });
  } catch (error) {
    console.error("Erro ao excluir prefeito:", error);
    return NextResponse.json({ error: "Erro ao excluir prefeito" }, { status: 500 });
  }
}
