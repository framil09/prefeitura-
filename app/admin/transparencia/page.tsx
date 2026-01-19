import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import TransparenciaAdminClient from "./_components/transparencia-admin-client";

export const metadata = {
  title: "Portal Transparência | Admin",
  description: "Gerenciar documentos de transparência",
};

export default async function TransparenciaAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const documentos = await db.documentoTransparencia.findMany({
    orderBy: { ordem: "asc" },
  });

  return <TransparenciaAdminClient initialDocumentos={documentos} />;
}
