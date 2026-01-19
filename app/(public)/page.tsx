import { prisma } from "@/lib/db";
import { HeroSection } from "./_components/hero-section";
import { NewsSection } from "./_components/news-section";
import { QuickAccess } from "./_components/quick-access";
import { SecretariasPreview } from "./_components/secretarias-preview";
import { GaleriaPreview } from "./_components/galeria-preview";
import { SobrePreview } from "./_components/sobre-preview";
import { TemperatureWidget } from "@/components/temperature-widget";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [noticias, secretarias, midias, config] = await Promise.all([
    prisma.noticia.findMany({
      where: { publicado: true },
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { secretaria: true }
    }),
    prisma.secretaria.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
      take: 6
    }),
    prisma.midia.findMany({
      where: { tipo: "FOTO", destaque: true },
      orderBy: { createdAt: "desc" },
      take: 6
    }),
    prisma.configuracaoSite.findFirst()
  ]);

  return (
    <div>
      <HeroSection config={config} />
      
      {/* Seção de Notícias */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <NewsSection noticias={noticias} />
        </div>
      </section>
      
      {/* Temperatura da Cidade */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <TemperatureWidget />
        </div>
      </section>
      
      <QuickAccess />
      
      <SobrePreview config={config} />
      <SecretariasPreview secretarias={secretarias} />
      <GaleriaPreview midias={midias} />
    </div>
  );
}
