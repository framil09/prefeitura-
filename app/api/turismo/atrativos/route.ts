import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  try {
    const atrativos = await prisma.atrativoTuristico.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
    });

    return NextResponse.json(atrativos);
  } catch (error) {
    console.error("Erro ao buscar atrativos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar atrativos" },
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
    const { nome, descricao, imagem, categoria, ordem, ativo } = body;

    if (!nome) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    const atrativo = await prisma.atrativoTuristico.create({
      data: {
        nome,
        descricao: descricao || null,
        imagem: imagem || null,
        categoria: categoria || "outro",
        ordem: ordem || 0,
        ativo: ativo !== undefined ? ativo : true,
      },
    });

    // Revalidar a página de turismo
    revalidatePath("/sobre");
    revalidatePath("/api/turismo/atrativos");

    return NextResponse.json(atrativo, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar atrativo:", error);
    return NextResponse.json(
      { error: "Erro ao criar atrativo" },
      { status: 500 }
    );
  }
}
