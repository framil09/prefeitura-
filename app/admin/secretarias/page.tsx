import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { SecretariasAdminClient } from "./_components/secretarias-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminSecretariasPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/admin/dashboard");
  }

  const secretarias = await prisma.secretaria.findMany({
    orderBy: { ordem: "asc" }
  });

  return <SecretariasAdminClient secretarias={secretarias} />;
}
