import { prisma } from "@/lib/db";
import { EmendasPublicaClient } from "./_components/emendas-publica-client";

export const dynamic = "force-dynamic";

export default async function EmendasPage() {
  const rawEmendas = await prisma.emendaImpositiva.findMany({
    where: { ativo: true },
    orderBy: { numero: "desc" }
  });

  // Sanitiza os campos null convertendo para undefined para satisfazer a tipagem da interface
  const emendas = rawEmendas.map((e) => ({
    ...e,
    descricao: e.descricao ?? undefined,
    secretaria: e.secretaria ?? undefined,
    documentoUrl: e.documentoUrl ?? undefined,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmendasPublicaClient emendas={emendas as any} />
      </div>
    </div>
  );
}
