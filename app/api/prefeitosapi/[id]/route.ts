import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
    const { nome, foto, ano_inicio, ano_fim, descricao, partido, destaque, ativo } = await req.json();

    const prefeito = await prisma.prefeito.update({
      where: { id: params.id },
      data: {
        nome,
        foto,
        ano_inicio,
        ano_fim,
        descricao,
        partido,
        destaque,
        ativo
      }
    });

    return NextResponse.json(prefeito);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar prefeito" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.prefeito.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Prefeito deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar prefeito" }, { status: 500 });
  }
}
