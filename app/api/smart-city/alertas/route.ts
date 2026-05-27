export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { sanitizeString } from "@/lib/sanitize";

/**
 * GET /api/smart-city/alertas - Alertas ativos (público)
 * POST /api/smart-city/alertas - Criar alerta (admin)
 */

export async function GET() {
  try {
    const alertas = await prisma.alertaMunicipal.findMany({
      where: {
        ativo: true,
        OR: [{ expiraEm: null }, { expiraEm: { gt: new Date() } }],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ alertas });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar alertas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAdmin();
    if ("error" in authResult) return authResult.error;

    const body = await req.json();
    const { tipo, titulo, descricao, severidade, expiraEm } = body;

    if (!tipo || !titulo || !descricao) {
      return NextResponse.json(
        { error: "Tipo, título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    const alerta = await prisma.alertaMunicipal.create({
      data: {
        tipo: sanitizeString(tipo),
        titulo: sanitizeString(titulo),
        descricao: sanitizeString(descricao),
        severidade: severidade || "info",
        expiraEm: expiraEm ? new Date(expiraEm) : null,
      },
    });

    return NextResponse.json({ alerta }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar alerta" }, { status: 500 });
  }
}
