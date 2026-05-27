import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";

export type AuthSession = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    secretariaId?: string;
    secretariaNome?: string;
  };
};

/**
 * Verifica se o usuário está autenticado e retorna a sessão.
 * Retorna null se não autenticado.
 */
export async function getAuthSession(): Promise<AuthSession | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session as AuthSession;
}

/**
 * Verifica se o usuário autenticado é ADMIN.
 */
export async function requireAdmin(): Promise<
  { session: AuthSession } | { error: NextResponse }
> {
  const session = await getAuthSession();
  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Não autenticado. Faça login para continuar." },
        { status: 401 }
      ),
    };
  }
  if (session.user.role !== "ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem realizar esta ação." },
        { status: 403 }
      ),
    };
  }
  return { session };
}

/**
 * Verifica se o usuário está autenticado (qualquer role).
 */
export async function requireAuth(): Promise<
  { session: AuthSession } | { error: NextResponse }
> {
  const session = await getAuthSession();
  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Não autenticado. Faça login para continuar." },
        { status: 401 }
      ),
    };
  }
  return { session };
}

/**
 * Verifica se o usuário tem um dos roles permitidos.
 */
export async function requireRole(
  allowedRoles: string[]
): Promise<{ session: AuthSession } | { error: NextResponse }> {
  const session = await getAuthSession();
  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Não autenticado. Faça login para continuar." },
        { status: 401 }
      ),
    };
  }
  if (!allowedRoles.includes(session.user.role)) {
    return {
      error: NextResponse.json(
        { error: "Acesso negado. Permissão insuficiente." },
        { status: 403 }
      ),
    };
  }
  return { session };
}
