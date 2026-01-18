export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import bcrypt from "bcryptjs";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const updateData: any = {
      email: body.email,
      name: body.name,
      role: body.role,
      secretariaId: body.secretariaId || null
    };

    if (body.password) {
      updateData.password = await bcrypt.hash(body.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        secretariaId: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Não permite excluir a si mesmo
    if ((session.user as any)?.id === params.id) {
      return NextResponse.json({ error: "Não pode excluir seu próprio usuário" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Usuário excluído" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir usuário" }, { status: 500 });
  }
}
