import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all editais
export async function GET(req: NextRequest) {
  try {
    const editais = await prisma.editalChamadaPublica.findMany({
      orderBy: { numero: "desc" },
    });
    return NextResponse.json(editais);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar editais", error: String(error) },
      { status: 500 }
    );
  }
}

// POST create new edital
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const edital = await prisma.editalChamadaPublica.create({
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

    return NextResponse.json(edital, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar edital", error: String(error) },
      { status: 500 }
    );
  }
}
