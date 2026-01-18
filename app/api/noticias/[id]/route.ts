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
    const noticia = await prisma.noticia.findUnique({
      where: { id: params.id },
      include: { secretaria: true, autor: { select: { name: true } } }
    });
    if (!noticia) {
      return NextResponse.json({ error: "Notícia não encontrada" }, { status: 404 });
    }
    return NextResponse.json(noticia);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar notícia" }, { status: 500 });
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

    const user = session.user as any;
    const existing = await prisma.noticia.findUnique({ where: { id: params.id } });
    
    if (!existing) {
      return NextResponse.json({ error: "Notícia não encontrada" }, { status: 404 });
    }

    // Verifica permissão
    if (user.role === "SECRETARIO" && existing.secretariaId !== user.secretariaId) {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const body = await req.json();
    const noticia = await prisma.noticia.update({
      where: { id: params.id },
      data: {
        titulo: body.titulo,
        resumo: body.resumo,
        conteudo: body.conteudo,
        imagemCapa: body.imagemCapa,
        destaque: body.destaque,
        publicado: body.publicado,
        secretariaId: body.secretariaId
      }
    });

    return NextResponse.json(noticia);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar notícia" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = session.user as any;
    const existing = await prisma.noticia.findUnique({ where: { id: params.id } });
    
    if (user.role === "SECRETARIO" && existing?.secretariaId !== user.secretariaId) {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    await prisma.noticia.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Notícia excluída" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir notícia" }, { status: 500 });
  }
}
