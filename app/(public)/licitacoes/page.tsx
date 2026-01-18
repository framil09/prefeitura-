import { prisma } from "@/lib/db";
import Image from "next/image";
import { LicitacoesClient } from "./_components/licitacoes-client";

export const dynamic = "force-dynamic";

export default async function LicitacoesPage() {
  const licitacoesRaw = await prisma.licitacao.findMany({
    orderBy: { dataAbertura: "desc" },
    include: { secretaria: true }
  });

  // Converte Decimal para number
  const licitacoes = licitacoesRaw.map(l => ({
    ...l,
    valorEstimado: l.valorEstimado ? Number(l.valorEstimado) : null
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-blue-900">
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Licitações</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Acompanhe os processos licitatórios da Prefeitura de Lambari
          </p>
        </div>
      </section>

      <LicitacoesClient licitacoes={licitacoes} />
    </div>
  );
}
