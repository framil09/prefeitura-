import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { NoticiasAdminClient } from "./_components/noticias-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminNoticiasPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  const user = session.user as any;
  const isAdmin = user?.role === "ADMIN";

  const noticias = await prisma.noticia.findMany({
    where: isAdmin ? {} : { OR: [{ secretariaId: user?.secretariaId }, { secretariaId: null }] },
    orderBy: { createdAt: "desc" },
    include: { secretaria: true }
  });

  const secretarias = await prisma.secretaria.findMany({
    where: { ativo: true },
    orderBy: { nome: "asc" }
  });

  return (
    <NoticiasAdminClient
      noticias={noticias}
      secretarias={secretarias}
      isAdmin={isAdmin}
      userSecretariaId={user?.secretariaId}
    />
  );
}
