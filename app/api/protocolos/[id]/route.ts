export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;

    const protocolo = await prisma.protocolo.findUnique({
      where: { id: params.id },
      include: {
        tramitacoes: { orderBy: { dataEntrada: "asc" } },
      },
    });

    if (!protocolo) {
      return NextResponse.json({ error: "Protocolo não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ protocolo });
  } catch (error) {
    console.error("Erro ao buscar protocolo:", error);
    return NextResponse.json({ error: "Erro ao buscar protocolo" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;

    const body = await req.json();
    const { status, prioridade } = body;

    const protocolo = await prisma.protocolo.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(prioridade && { prioridade }),
      },
    });

    return NextResponse.json({ protocolo });
  } catch (error) {
    console.error("Erro ao atualizar protocolo:", error);
    return NextResponse.json({ error: "Erro ao atualizar protocolo" }, { status: 500 });
  }
}
