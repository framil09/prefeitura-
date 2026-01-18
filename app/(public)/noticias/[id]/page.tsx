import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateUTC, formatDateLongUTC } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NoticiaDetailPage({ params }: { params: { id: string } }) {
  const noticia = await prisma.noticia.findUnique({
    where: { id: params.id },
    include: { secretaria: true, autor: true }
  });

  if (!noticia) {
    notFound();
  }

  // Notícias relacionadas
  const relacionadas = await prisma.noticia.findMany({
    where: {
      id: { not: noticia.id },
      publicado: true
    },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative">
        {noticia.imagemCapa && (
          <div className="relative h-[400px]">
            <Image
              src={noticia.imagemCapa}
              alt={noticia.titulo}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-4xl mx-auto px-4 py-8 text-white">
            <Link href="/noticias">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Notícias
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-3">
              {noticia.destaque && (
                <Badge className="bg-cyan-500">Destaque</Badge>
              )}
              <span className="flex items-center gap-1 text-sm text-gray-300">
                <Calendar className="w-4 h-4" />
                {formatDateLongUTC(noticia.createdAt)}
              </span>
              {noticia.secretaria && (
                <span className="flex items-center gap-1 text-sm text-gray-300">
                  <Tag className="w-4 h-4" />
                  {noticia.secretaria.nome}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{noticia.titulo}</h1>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {noticia.resumo && (
            <p className="text-xl text-gray-600 mb-8 border-l-4 border-blue-600 pl-4">
              {noticia.resumo}
            </p>
          )}

          <div className="prose prose-lg max-w-none">
            {noticia.conteudo?.split('\n')?.map((paragraph: string, i: number) => (
              <p key={i} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Notícias Relacionadas */}
      {relacionadas.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Outras Notícias</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relacionadas.map((rel) => (
                <Link key={rel.id} href={`/noticias/${rel.id}`}>
                  <div className="group">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 mb-3">
                      {rel.imagemCapa && (
                        <Image
                          src={rel.imagemCapa}
                          alt={rel.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {formatDateUTC(rel.createdAt)}
                    </p>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {rel.titulo}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
