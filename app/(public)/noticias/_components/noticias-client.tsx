"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Tag, Search, Newspaper, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDateUTC } from "@/lib/utils";

interface NoticiasClientProps {
  noticias: any[];
}

export function NoticiasClient({ noticias }: NoticiasClientProps) {
  const safeNoticias = noticias ?? [];
  const [search, setSearch] = useState("");

  const filtered = safeNoticias.filter((noticia) => {
    return !search || 
      noticia?.titulo?.toLowerCase()?.includes(search.toLowerCase()) ||
      noticia?.resumo?.toLowerCase()?.includes(search.toLowerCase());
  });

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-cyan-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Busca aprimorada */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-cyan-100"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
              <Input
                placeholder="Buscar por título ou conteúdo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-lg whitespace-nowrap">
              {filtered.length} notícia{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        {/* Grid de Notícias */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((noticia, index) => (
              <motion.div
                key={noticia?.id ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={`/noticias/${noticia?.id}`} className="group h-full">
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-200 hover:border-cyan-300 flex flex-col">
                    {/* Imagem com overlay */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                      {noticia?.imagemCapa ? (
                        <>
                          <Image
                            src={noticia.imagemCapa}
                            alt={noticia?.titulo ?? "Notícia"}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100">
                          <Newspaper className="w-12 h-12 text-cyan-400" />
                        </div>
                      )}
                      
                      {/* Badge Destaque */}
                      {noticia?.destaque && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute top-3 left-3"
                        >
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg">
                            ⭐ Destaque
                          </Badge>
                        </motion.div>
                      )}

                      {/* Ícone seta no hover */}
                      <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                        <ArrowRight className="w-5 h-5 text-cyan-600" />
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {/* Metadados */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 flex-wrap">
                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                          <Calendar className="w-3 h-3 text-cyan-600" />
                          {noticia?.createdAt && formatDateUTC(noticia.createdAt)}
                        </span>
                        {noticia?.secretaria && (
                          <span className="flex items-center gap-1 bg-cyan-50 px-3 py-1 rounded-full text-cyan-700 font-medium">
                            <Tag className="w-3 h-3" />
                            {noticia.secretaria.sigla ?? noticia.secretaria.nome}
                          </span>
                        )}
                      </div>

                      {/* Título */}
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors duration-300">
                        {noticia?.titulo ?? "Sem título"}
                      </h3>

                      {/* Resumo */}
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {noticia?.resumo ?? ""}
                      </p>

                      {/* Footer com link */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-cyan-200 transition-colors">
                        <span className="text-xs font-semibold text-cyan-600 group-hover:text-cyan-700 flex items-center gap-1">
                          Ler mais
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          5 min
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Estado vazio */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white rounded-2xl p-12 inline-block shadow-sm border border-gray-200">
              <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-semibold text-gray-600 mb-2">Nenhuma notícia encontrada</p>
              <p className="text-sm text-gray-500">Tente ajustar sua busca ou verifique mais tarde.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
