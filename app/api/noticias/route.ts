export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  try {
    const noticias = await prisma.noticia.findMany({
      orderBy: { createdAt: "desc" },
      include: { secretaria: true, autor: { select: { name: true } } }
    });
    return NextResponse.json(noticias);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar notícias" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = session.user as any;
    const body = await req.json();
    
    // Secretário só pode criar para sua secretaria
    if (user.role === "SECRETARIO" && body.secretariaId && body.secretariaId !== user.secretariaId) {
      return NextResponse.json({ error: "Sem permissão para esta secretaria" }, { status: 403 });
    }

    const noticia = await prisma.noticia.create({
      data: {
        titulo: body.titulo,
        resumo: body.resumo,
        conteudo: body.conteudo,
        imagemCapa: body.imagemCapa,
        destaque: body.destaque ?? false,
        publicado: body.publicado ?? true,
        autorId: user.id,
        secretariaId: body.secretariaId || (user.role === "SECRETARIO" ? user.secretariaId : null)
      }
    });

    return NextResponse.json(noticia, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar notícia:", error);
    return NextResponse.json({ error: "Erro ao criar notícia" }, { status: 500 });
  }
}
