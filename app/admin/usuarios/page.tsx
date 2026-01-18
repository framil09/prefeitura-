import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { UsuariosAdminClient } from "./_components/usuarios-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminUsuariosPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/admin/dashboard");
  }

  const usuarios = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      secretariaId: true,
      secretaria: { select: { nome: true } },
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });

  const secretarias = await prisma.secretaria.findMany({
    where: { ativo: true },
    orderBy: { nome: "asc" }
  });

  return <UsuariosAdminClient usuarios={usuarios} secretarias={secretarias} />;
}
