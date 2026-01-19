import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  try {
    const fontes = await prisma.fonteMuneral.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json(fontes);
  } catch (error) {
    console.error("Erro ao buscar fontes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fontes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { nome, descricao, propriedades, ordem, ativo } = body;

    if (!nome) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    const fonte = await prisma.fonteMuneral.create({
      data: {
        nome,
        descricao: descricao || null,
        propriedades: propriedades || null,
        ordem: ordem || 0,
        ativo: ativo !== undefined ? ativo : true,
      },
    });

    // Revalidar a página de turismo
    revalidatePath("/sobre");
    revalidatePath("/api/turismo/fontes");

    return NextResponse.json(fonte, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar fonte:", error);
    return NextResponse.json(
      { error: "Erro ao criar fonte" },
      { status: 500 }
    );
  }
}
