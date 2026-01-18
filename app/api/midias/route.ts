export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  try {
    const midias = await prisma.midia.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(midias);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar mídias" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const midia = await prisma.midia.create({
      data: {
        titulo: body.titulo,
        descricao: body.descricao,
        tipo: body.tipo,
        url: body.url,
        thumbnail: body.thumbnail,
        destaque: body.destaque ?? false
      }
    });

    return NextResponse.json(midia, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar mídia" }, { status: 500 });
  }
}
