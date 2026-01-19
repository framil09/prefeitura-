import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const permissoes = await prisma.permissao.findMany({
      where: { userId: params.userId },
    });

    return NextResponse.json(permissoes);
  } catch (error) {
    console.error("Erro ao buscar permissões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar permissões" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { secao, permitido } = body;

    if (!secao) {
      return NextResponse.json(
        { error: "Seção é obrigatória" },
        { status: 400 }
      );
    }

    const permissao = await prisma.permissao.upsert({
      where: {
        userId_secao: {
          userId: params.userId,
          secao: secao,
        },
      },
      update: { permitido },
      create: {
        userId: params.userId,
        secao,
        permitido: permitido !== undefined ? permitido : true,
      },
    });

    revalidatePath("/admin");

    return NextResponse.json(permissao);
  } catch (error) {
    console.error("Erro ao atualizar permissão:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar permissão" },
      { status: 500 }
    );
  }
}
