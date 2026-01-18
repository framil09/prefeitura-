export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  try {
    const secretarias = await prisma.secretaria.findMany({
      orderBy: { ordem: "asc" }
    });
    return NextResponse.json(secretarias);
  } catch (error) {
    console.error("Erro ao buscar secretarias:", error);
    return NextResponse.json({ error: "Erro ao buscar secretarias" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const secretaria = await prisma.secretaria.create({
      data: {
        nome: body.nome,
        sigla: body.sigla,
        descricao: body.descricao,
        secretario: body.secretario,
        fotoSecretario: body.fotoSecretario,
        telefone: body.telefone,
        email: body.email,
        endereco: body.endereco,
        ordem: body.ordem ?? 0,
        ativo: body.ativo ?? true
      }
    });

    return NextResponse.json(secretaria, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar secretaria:", error);
    return NextResponse.json({ error: "Erro ao criar secretaria" }, { status: 500 });
  }
}
