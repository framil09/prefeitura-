import { prisma } from "@/lib/db";
import { ConfiguracaoAdminClient } from "./_components/configuracao-admin-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function ConfiguracaoAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const config = await prisma.configuracaoSite.findFirst();
  const prefeitos = await prisma.prefeito.findMany({
    orderBy: { ano_inicio: "desc" }
  });

  return <ConfiguracaoAdminClient config={config} prefeitos={prefeitos} />;
}
