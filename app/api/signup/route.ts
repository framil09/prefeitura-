export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, role, secretariaId } = body ?? {};
    
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, senha e nome são obrigatórios" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 400 }
      );
    }

    // Normaliza o role para uppercase
    const normalizedRole = role?.toUpperCase?.() || "EDITOR";
    const validRoles = ["ADMIN", "SECRETARIO", "EDITOR"];
    const finalRole = validRoles.includes(normalizedRole) ? normalizedRole : "EDITOR";

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: finalRole as any,
        secretariaId: secretariaId || null
      }
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no signup:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
