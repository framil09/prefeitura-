import { prisma } from "@/lib/db";
import Image from "next/image";
import { Droplets, Mountain, Building, MapPin, Calendar, Users, Award } from "lucide-react";
import { SobreClient } from "./_components/sobre-client";

export const dynamic = "force-dynamic";

export default async function SobrePage() {
  const config = await prisma.configuracaoSite.findFirst();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-blue-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Lambari_MG_Brasil_-_Vista_da_Cidade_-_panoramio.jpg"
            alt="Vista de Lambari"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Lambari</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Conheça a história e as belezas da Estância Hidromineral de Lambari
          </p>
        </div>
      </section>

      <SobreClient config={config} />
    </div>
  );
}
