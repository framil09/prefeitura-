export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const secretaria = await prisma.secretaria.findUnique({
      where: { id: params.id }
    });
    if (!secretaria) {
      return NextResponse.json({ error: "Secretaria não encontrada" }, { status: 404 });
    }
    return NextResponse.json(secretaria);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar secretaria" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const secretaria = await prisma.secretaria.update({
      where: { id: params.id },
      data: {
        nome: body.nome,
        sigla: body.sigla,
        descricao: body.descricao,
        secretario: body.secretario,
        fotoSecretario: body.fotoSecretario,
        telefone: body.telefone,
        email: body.email,
        endereco: body.endereco,
        ordem: body.ordem,
        ativo: body.ativo
      }
    });

    return NextResponse.json(secretaria);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar secretaria" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await prisma.secretaria.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Secretaria excluída" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir secretaria" }, { status: 500 });
  }
}
