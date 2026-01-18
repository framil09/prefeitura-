import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { DashboardClient } from "./_components/dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  const user = session.user as any;
  const isAdmin = user?.role === "ADMIN";
  const secretariaId = user?.secretariaId;

  const [secretarias, licitacoes, noticias, midias, usuarios] = await Promise.all([
    prisma.secretaria.count({ where: { ativo: true } }),
    isAdmin
      ? prisma.licitacao.count()
      : prisma.licitacao.count({ where: { secretariaId } }),
    isAdmin
      ? prisma.noticia.count()
      : prisma.noticia.count({ where: { OR: [{ secretariaId }, { secretariaId: null }] } }),
    prisma.midia.count(),
    isAdmin ? prisma.user.count() : 0
  ]);

  const recentNoticiasRaw = await prisma.noticia.findMany({
    where: isAdmin ? {} : { OR: [{ secretariaId }, { secretariaId: null }] },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { secretaria: true }
  });

  const recentLicitacoesRaw = await prisma.licitacao.findMany({
    where: isAdmin ? {} : { secretariaId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { secretaria: true }
  });

  // Converte Decimal para number e Date para string
  const recentNoticias = recentNoticiasRaw.map(n => ({
    ...n,
    createdAt: n.createdAt.toISOString()
  }));

  const recentLicitacoes = recentLicitacoesRaw.map(l => ({
    ...l,
    valorEstimado: l.valorEstimado ? Number(l.valorEstimado) : null,
    dataAbertura: l.dataAbertura.toISOString(),
    createdAt: l.createdAt.toISOString()
  }));

  return (
    <DashboardClient
      stats={{ secretarias, licitacoes, noticias, midias, usuarios }}
      recentNoticias={recentNoticias}
      recentLicitacoes={recentLicitacoes}
      isAdmin={isAdmin}
      userName={user?.name ?? "Usuário"}
    />
  );
}
