import { prisma } from "@/lib/db";
import { EditalAdminClient } from "./_components/edital-admin-client";

export const dynamic = "force-dynamic";

export default async function EditaisPage() {
  const editais = await prisma.editalChamadaPublica.findMany({
    orderBy: { numero: "desc" }
  });

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Editais e Chamadas Públicas</h1>
        <p className="text-gray-600 mt-2">Gerenciar editais, chamadas públicas e avisos de licitação</p>
      </div>
      <EditalAdminClient initialEditais={editais} />
    </main>
  );
}
