export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, assunto, mensagem } = body ?? {};

    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Aqui poderia salvar em uma tabela de contatos
    // Por ora apenas retorna sucesso
    console.log("Contato recebido:", { nome, email, assunto, mensagem });

    return NextResponse.json({ message: "Mensagem recebida com sucesso" });
  } catch (error) {
    console.error("Erro no contato:", error);
    return NextResponse.json(
      { error: "Erro ao processar mensagem" },
      { status: 500 }
    );
  }
}
