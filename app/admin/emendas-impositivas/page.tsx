import { prisma } from "@/lib/db";
import { EmendaImpositivaAdminClient } from "./_components/emenda-impositiva-admin-client";

export const dynamic = "force-dynamic";

export default async function EmendasImpositivasPage() {
  const emendas = await prisma.emendaImpositiva.findMany({
    orderBy: { numero: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Emendas Impositivas</h1>
      <EmendaImpositivaAdminClient initialEmendas={emendas} />
    </div>
  );
}
