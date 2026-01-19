import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const atrativo = await prisma.atrativoTuristico.findUnique({
      where: { id: params.id },
    });

    if (!atrativo) {
      return NextResponse.json(
        { error: "Atrativo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(atrativo);
  } catch (error) {
    console.error("Erro ao buscar atrativo:", error);
    return NextResponse.json(
      { error: "Erro ao buscar atrativo" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { nome, descricao, imagem, categoria, ordem, ativo } = body;

    const atrativo = await prisma.atrativoTuristico.update({
      where: { id: params.id },
      data: {
        ...(nome && { nome }),
        ...(descricao !== undefined && { descricao }),
        ...(imagem !== undefined && { imagem }),
        ...(categoria && { categoria }),
        ...(ordem !== undefined && { ordem }),
        ...(ativo !== undefined && { ativo }),
      },
    });

    // Revalidar a página de turismo
    revalidatePath("/sobre");
    revalidatePath("/api/turismo/atrativos");

    return NextResponse.json(atrativo);
  } catch (error) {
    console.error("Erro ao atualizar atrativo:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar atrativo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await prisma.atrativoTuristico.delete({
      where: { id: params.id },
    });

    // Revalidar a página de turismo
    revalidatePath("/sobre");
    revalidatePath("/api/turismo/atrativos");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar atrativo:", error);
    return NextResponse.json(
      { error: "Erro ao deletar atrativo" },
      { status: 500 }
    );
  }
}
