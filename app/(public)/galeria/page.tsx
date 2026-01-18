import { prisma } from "@/lib/db";
import { GaleriaClient } from "./_components/galeria-client";

export const dynamic = "force-dynamic";

export default async function GaleriaPage() {
  const midias = await prisma.midia.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeria</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fotos e vídeos das belezas de Lambari e dos eventos municipais
          </p>
        </div>
      </section>

      <GaleriaClient midias={midias} />
    </div>
  );
}
