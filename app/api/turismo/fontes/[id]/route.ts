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
    const fonte = await prisma.fonteMuneral.findUnique({
      where: { id: params.id },
    });

    if (!fonte) {
      return NextResponse.json(
        { error: "Fonte não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(fonte);
  } catch (error) {
    console.error("Erro ao buscar fonte:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fonte" },
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
    const { nome, descricao, propriedades, ordem, ativo } = body;

    const fonte = await prisma.fonteMuneral.update({
      where: { id: params.id },
      data: {
        ...(nome && { nome }),
        ...(descricao !== undefined && { descricao }),
        ...(propriedades !== undefined && { propriedades }),
        ...(ordem !== undefined && { ordem }),
        ...(ativo !== undefined && { ativo }),
      },
    });

    // Revalidar a página de turismo
    revalidatePath("/sobre");
    revalidatePath("/api/turismo/fontes");

    return NextResponse.json(fonte);
  } catch (error) {
    console.error("Erro ao atualizar fonte:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar fonte" },
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

    await prisma.fonteMuneral.delete({
      where: { id: params.id },
    });

    // Revalidar a página de turismo
    revalidatePath("/sobre");
    revalidatePath("/api/turismo/fontes");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar fonte:", error);
    return NextResponse.json(
      { error: "Erro ao deletar fonte" },
      { status: 500 }
    );
  }
}
