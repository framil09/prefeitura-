import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documento = await prisma.documentoTransparencia.findUnique({
      where: { id: params.id },
    });

    if (!documento) {
      return NextResponse.json(
        { error: "Documento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(documento);
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    return NextResponse.json(
      { error: "Erro ao buscar documento" },
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
    const { titulo, descricao, categoria, url, arquivo, dataPublicacao, ordem, ativo, destaque } = body;

    const documento = await prisma.documentoTransparencia.update({
      where: { id: params.id },
      data: {
        ...(titulo && { titulo }),
        ...(descricao !== undefined && { descricao }),
        ...(categoria && { categoria }),
        ...(url !== undefined && { url }),
        ...(arquivo !== undefined && { arquivo }),
        ...(dataPublicacao && { dataPublicacao: new Date(dataPublicacao) }),
        ...(ordem !== undefined && { ordem }),
        ...(ativo !== undefined && { ativo }),
        ...(destaque !== undefined && { destaque }),
      },
    });

    return NextResponse.json(documento);
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar documento" },
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

    await prisma.documentoTransparencia.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar documento:", error);
    return NextResponse.json(
      { error: "Erro ao deletar documento" },
      { status: 500 }
    );
  }
}
