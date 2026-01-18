import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { GaleriaAdminClient } from "./_components/galeria-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminGaleriaPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  const midias = await prisma.midia.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <GaleriaAdminClient midias={midias} />;
}
