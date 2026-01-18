import { prisma } from "@/lib/db";
import Image from "next/image";
import { SecretariasClient } from "./_components/secretarias-client";

export const dynamic = "force-dynamic";

export default async function SecretariasPage() {
  const secretarias = await prisma.secretaria.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" }
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-blue-800">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://cdn.abacus.ai/images/b65b70e2-6054-4270-a05f-c2a809df8f1f.png"
            alt="Prefeitura"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Secretarias Municipais</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Conheça os órgãos que compõem a administração municipal de Lambari
          </p>
        </div>
      </section>

      <SecretariasClient secretarias={secretarias} />
    </div>
  );
}
