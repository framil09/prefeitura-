export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await prisma.midia.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Mídia excluída" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir mídia" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const midia = await prisma.midia.update({
      where: { id: params.id },
      data: {
        titulo: body.titulo,
        descricao: body.descricao,
        tipo: body.tipo,
        url: body.url,
        thumbnail: body.thumbnail,
        destaque: body.destaque
      }
    });

    return NextResponse.json(midia);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar mídia" }, { status: 500 });
  }
}
