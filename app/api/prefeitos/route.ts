export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  try {
    const prefeitos = await prisma.prefeito.findMany({
      orderBy: [{ destaque: "desc" }, { ano_inicio: "desc" }]
    });
    return NextResponse.json(prefeitos);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar prefeitos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();

    const prefeito = await prisma.prefeito.create({
      data: {
        nome: body.nome,
        partido: body.partido || null,
        ano_inicio: body.ano_inicio,
        ano_fim: body.ano_fim || null,
        foto: body.foto || null,
        descricao: body.descricao || null,
        destaque: body.destaque ?? false,
        ativo: body.ativo ?? true,
        ordem: body.ordem ?? 0
      }
    });

    return NextResponse.json(prefeito, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar prefeito:", error);
    return NextResponse.json({ error: "Erro ao criar prefeito" }, { status: 500 });
  }
}
