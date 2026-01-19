import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const edital = await prisma.editalChamadaPublica.findUnique({
      where: { id: params.id },
    });

    if (!edital) {
      return NextResponse.json({ message: "Edital não encontrado" }, { status: 404 });
    }

    return NextResponse.json(edital);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar edital", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const edital = await prisma.editalChamadaPublica.update({
      where: { id: params.id },
      data: {
        numero: body.numero,
        titulo: body.titulo,
        descricao: body.descricao,
        tipo: body.tipo,
        dataAbertura: body.dataAbertura ? new Date(body.dataAbertura) : null,
        dataEncerramento: body.dataEncerramento ? new Date(body.dataEncerramento) : null,
        documentoUrl: body.documentoUrl,
        resultadoUrl: body.resultadoUrl,
        conteudo: body.conteudo,
        ativo: body.ativo,
        destaque: body.destaque,
      },
    });

    return NextResponse.json(edital);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar edital", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.editalChamadaPublica.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Edital deletado" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar edital", error: String(error) },
      { status: 500 }
    );
  }
}
