export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/api-auth";
import { sanitizeString, isValidEmail, isStrongPassword } from "@/lib/sanitize";

/**
 * POST /api/signup
 * Cria um novo usuário. REQUER autenticação de administrador.
 */
export async function POST(req: NextRequest) {
  try {
    // Verificar autenticação de admin
    const authResult = await requireAdmin();
    if ("error" in authResult) return authResult.error;

    const body = await req.json();
    const { email, password, name, role, secretariaId } = body ?? {};

    // Validação de campos obrigatórios
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, senha e nome são obrigatórios" },
        { status: 400 }
      );
    }

    // Validar email
    const sanitizedEmail = sanitizeString(email).toLowerCase();
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Formato de email inválido" },
        { status: 400 }
      );
    }

    // Validar senha
    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { error: "Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula e 1 número" },
        { status: 400 }
      );
    }

    // Sanitizar nome
    const sanitizedName = sanitizeString(name);
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { error: "Nome deve ter entre 2 e 100 caracteres" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });
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

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email: sanitizedEmail,
        password: hashedPassword,
        name: sanitizedName,
        role: finalRole as any,
        secretariaId: secretariaId || null,
      },
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no signup:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar usuário" },
      { status: 500 }
    );
  }
}
