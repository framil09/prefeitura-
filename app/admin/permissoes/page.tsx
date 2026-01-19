import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import PermissoesAdminClient from "./_components/permissoes-admin-client";

export const metadata = {
  title: "Permissões | Admin",
  description: "Gerenciar permissões de usuários",
};

export default async function PermissoesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const usuarios = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return <PermissoesAdminClient usuarios={usuarios} />;
}
