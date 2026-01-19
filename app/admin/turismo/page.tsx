import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import TurismoAdminClient from "./_components/turismo-admin-client";

export default async function TurismoAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const [atrativos, fontes] = await Promise.all([
    prisma.atrativoTuristico.findMany({
      orderBy: { ordem: "asc" },
    }),
    prisma.fonteMuneral.findMany({
      orderBy: { ordem: "asc" },
    }),
  ]);

  return (
    <TurismoAdminClient
      initialAtrativos={atrativos}
      initialFontes={fontes}
    />
  );
}
