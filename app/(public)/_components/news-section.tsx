"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag, Newspaper, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateUTC } from "@/lib/utils";

interface NewsSectionProps {
  noticias: any[];
}

export function NewsSection({ noticias }: NewsSectionProps) {
  const safeNoticias = noticias ?? [];

  if (safeNoticias.length === 0) {
    return null;
  }

  const [destaque, ...outras] = safeNoticias;

  return (
    <div className="space-y-6">
      {/* Header da seção */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Últimas Notícias</h2>
            <p className="text-gray-500 text-sm">Acompanhe as novidades da cidade</p>
          </div>
        </div>
        <Link href="/noticias">
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
          >
            Ver todas
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

      {/* Layout: Destaque + Lista lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        
        {/* Notícia em Destaque (maior) */}
        {destaque && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Link href={`/noticias/${destaque?.id}`} className="block group">
              <div className="relative h-full min-h-[320px] md:min-h-[380px] rounded-2xl overflow-hidden shadow-lg">
                {/* Imagem de fundo */}
                <div className="absolute inset-0 bg-gray-300">
                  {destaque?.imagemCapa && (
                    <Image
                      src={destaque.imagemCapa}
                      alt={destaque?.titulo ?? "Notícia em destaque"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                
                {/* Gradiente overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Badge de destaque */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg">
                    <Clock className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                  {destaque?.secretaria && (
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {destaque.secretaria.nome}
                    </Badge>
                  )}
                </div>
                
                {/* Conteúdo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 text-sm text-gray-200 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {destaque?.createdAt && formatDateUTC(destaque.createdAt)}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {destaque?.titulo ?? "Sem título"}
                  </h3>
                  <p className="text-gray-200 line-clamp-2 text-sm md:text-base">
                    {destaque?.resumo ?? ""}
                  </p>
                  <div className="mt-4 flex items-center text-cyan-300 font-medium text-sm group-hover:gap-2 transition-all">
                    <Eye className="w-4 h-4 mr-2" />
                    Leia a matéria completa
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Lista de outras notícias */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {outras.slice(0, 3).map((noticia, index) => (
            <motion.div
              key={noticia?.id ?? index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/noticias/${noticia?.id}`} className="block group">
                <div className="flex gap-4 p-3 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    {noticia?.imagemCapa && (
                      <Image
                        src={noticia.imagemCapa}
                        alt={noticia?.titulo ?? "Notícia"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    {noticia?.destaque && (
                      <div className="absolute top-1 left-1">
                        <span className="block w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      {noticia?.createdAt && formatDateUTC(noticia.createdAt)}
                    </div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 text-sm md:text-base">
                      {noticia?.titulo ?? "Sem título"}
                    </h4>
                    {noticia?.secretaria && (
                      <span className="mt-1 text-xs text-blue-600 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {noticia.secretaria.nome}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Botão ver mais no mobile */}
          <Link href="/noticias" className="lg:hidden">
            <Button 
              variant="outline" 
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Ver todas as notícias
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
