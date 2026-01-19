import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const prefeitosApi = await prisma.prefeito.findMany({
      where: { ativo: true },
      orderBy: { ano_inicio: "desc" }
    });
    return NextResponse.json(prefeitosApi);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar prefeitOS" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nome, foto, ano_inicio, ano_fim, descricao, partido, destaque } = await req.json();

    const prefeito = await prisma.prefeito.create({
      data: {
        nome,
        foto,
        ano_inicio,
        ano_fim,
        descricao,
        partido,
        destaque: destaque || false
      }
    });

    return NextResponse.json(prefeito);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar prefeito" }, { status: 500 });
  }
}
