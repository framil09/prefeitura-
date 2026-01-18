import { prisma } from "@/lib/db";
import { HeroSection } from "./_components/hero-section";
import { NewsSection } from "./_components/news-section";
import { QuickAccess } from "./_components/quick-access";
import { SecretariasPreview } from "./_components/secretarias-preview";
import { GaleriaPreview } from "./_components/galeria-preview";
import { SobrePreview } from "./_components/sobre-preview";
import { WeatherWidgetLarge } from "@/components/weather-widget";

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
      <QuickAccess />
      
      {/* Seção de Notícias e Clima */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsSection noticias={noticias} />
            </div>
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🌤️ Clima em Lambari
              </h2>
              <WeatherWidgetLarge />
            </div>
          </div>
        </div>
      </section>
      
      <SobrePreview config={config} />
      <SecretariasPreview secretarias={secretarias} />
      <GaleriaPreview midias={midias} />
    </div>
  );
}
