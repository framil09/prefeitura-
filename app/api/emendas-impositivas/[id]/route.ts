import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const emenda = await prisma.emendaImpositiva.update({
      where: { id: params.id },
      data: {
        numero: data.numero,
        titulo: data.titulo,
        descricao: data.descricao,
        autor: data.autor,
        secretaria: data.secretaria,
        valor: data.valor,
        dataAutoria: data.dataAutoria ? new Date(data.dataAutoria) : null,
        dataExecucao: data.dataExecucao ? new Date(data.dataExecucao) : null,
        percentualExecucao: data.percentualExecucao,
        documentoUrl: data.documentoUrl,
        ativo: data.ativo,
      },
    });

    return NextResponse.json(emenda);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Erro ao atualizar emenda" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.emendaImpositiva.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Emenda deletada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar emenda" },
      { status: 500 }
    );
  }
}
