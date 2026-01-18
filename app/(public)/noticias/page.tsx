import { prisma } from "@/lib/db";
import { NoticiasClient } from "./_components/noticias-client";

export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
  const noticias = await prisma.noticia.findMany({
    where: { publicado: true },
    orderBy: { createdAt: "desc" },
    include: { secretaria: true }
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notícias</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Acompanhe as últimas notícias e eventos da Prefeitura de Lambari
          </p>
        </div>
      </section>

      <NoticiasClient noticias={noticias} />
    </div>
  );
}
