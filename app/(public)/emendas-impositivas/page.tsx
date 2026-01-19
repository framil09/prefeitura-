import { prisma } from "@/lib/db";
import { EmendasPublicaClient } from "./_components/emendas-publica-client";

export const dynamic = "force-dynamic";

export default async function EmendasPage() {
  const emendas = await prisma.emendaImpositiva.findMany({
    where: { ativo: true },
    orderBy: { numero: "desc" }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmendasPublicaClient emendas={emendas} />
      </div>
    </div>
  );
}
