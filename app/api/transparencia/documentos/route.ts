import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const documentos = await prisma.documentoTransparencia.findMany({
      where: { ativo: true },
      orderBy: [{ destaque: "desc" }, { ordem: "asc" }],
    });

    return NextResponse.json(documentos);
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar documentos" },
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
    const { titulo, descricao, categoria, url, arquivo, dataPublicacao, ordem, ativo, destaque } = body;

    if (!titulo) {
      return NextResponse.json(
        { error: "Título é obrigatório" },
        { status: 400 }
      );
    }

    const documento = await prisma.documentoTransparencia.create({
      data: {
        titulo,
        descricao: descricao || null,
        categoria: categoria || "outro",
        url: url || null,
        arquivo: arquivo || null,
        dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : new Date(),
        ordem: ordem || 0,
        ativo: ativo !== undefined ? ativo : true,
        destaque: destaque !== undefined ? destaque : false,
      },
    });

    return NextResponse.json(documento, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar documento:", error);
    return NextResponse.json(
      { error: "Erro ao criar documento" },
      { status: 500 }
    );
  }
}
