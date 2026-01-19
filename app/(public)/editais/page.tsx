import { prisma } from "@/lib/db";
import { EditaisClient } from "./_components/editais-client";

export const dynamic = "force-dynamic";

export default async function EditaisPage() {
  const editais = await prisma.editalChamadaPublica.findMany({
    where: { ativo: true },
    orderBy: [{ destaque: "desc" }, { dataAbertura: "desc" }],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Editais e Chamadas Públicas</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Acompanhe os editais, chamadas públicas e avisos de licitação da Prefeitura de Lambari
          </p>
        </div>
      </section>

      <EditaisClient editais={editais} />
    </div>
  );
}
