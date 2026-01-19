import { prisma } from "@/lib/db";
import { GestaoAdminClient } from "./_components/gestao-admin-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function GestaoAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const config = await prisma.configuracaoSite.findFirst();
  const prefeitos = await prisma.prefeito.findMany({
    orderBy: [{ destaque: "desc" }, { ano_inicio: "desc" }]
  });

  return <GestaoAdminClient prefeitos={prefeitos} config={config} />;
}
