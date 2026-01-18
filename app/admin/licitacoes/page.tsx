import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { LicitacoesAdminClient } from "./_components/licitacoes-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminLicitacoesPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  const user = session.user as any;
  const isAdmin = user?.role === "ADMIN";

  const licitacoesRaw = await prisma.licitacao.findMany({
    where: isAdmin ? {} : { secretariaId: user?.secretariaId },
    orderBy: { createdAt: "desc" },
    include: { secretaria: true }
  });

  // Converte Decimal para number
  const licitacoes = licitacoesRaw.map(l => ({
    ...l,
    valorEstimado: l.valorEstimado ? Number(l.valorEstimado) : null
  }));

  const secretarias = await prisma.secretaria.findMany({
    where: { ativo: true },
    orderBy: { nome: "asc" }
  });

  return (
    <LicitacoesAdminClient
      licitacoes={licitacoes}
      secretarias={secretarias}
      isAdmin={isAdmin}
      userSecretariaId={user?.secretariaId}
    />
  );
}
