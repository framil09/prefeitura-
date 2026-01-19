import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const emendas = await prisma.emendaImpositiva.findMany({
      where: { ativo: true },
      orderBy: { numero: "desc" },
    });

    return NextResponse.json(emendas);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar emendas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const emenda = await prisma.emendaImpositiva.create({
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

    return NextResponse.json(emenda, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar emenda:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao criar emenda" },
      { status: 400 }
    );
  }
}
