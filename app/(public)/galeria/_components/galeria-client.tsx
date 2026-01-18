"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Video, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GaleriaClientProps {
  midias: any[];
}

export function GaleriaClient({ midias }: GaleriaClientProps) {
  const safeMidias = midias ?? [];
  const [filter, setFilter] = useState<"TODOS" | "FOTO" | "VIDEO">("TODOS");
  const [selectedMidia, setSelectedMidia] = useState<any>(null);

  const filtered = safeMidias.filter((midia) => {
    if (filter === "TODOS") return true;
    return midia?.tipo === filter;
  });

  const fotos = safeMidias.filter(m => m?.tipo === "FOTO");
  const videos = safeMidias.filter(m => m?.tipo === "VIDEO");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={filter === "TODOS" ? "default" : "outline"}
            onClick={() => setFilter("TODOS")}
          >
            Todos ({safeMidias.length})
          </Button>
          <Button
            variant={filter === "FOTO" ? "default" : "outline"}
            onClick={() => setFilter("FOTO")}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Fotos ({fotos.length})
          </Button>
          <Button
            variant={filter === "VIDEO" ? "default" : "outline"}
            onClick={() => setFilter("VIDEO")}
          >
            <Video className="w-4 h-4 mr-2" />
            Vídeos ({videos.length})
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((midia, index) => (
            <motion.div
              key={midia?.id ?? index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-200"
              onClick={() => setSelectedMidia(midia)}
            >
              <Image
                src={midia?.thumbnail ?? midia?.url ?? ""}
                alt={midia?.titulo ?? "Mídia"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                {midia?.tipo === "VIDEO" && (
                  <Play className="w-10 h-10 text-white mb-2" />
                )}
                <p className="text-white text-sm font-medium text-center line-clamp-2">
                  {midia?.titulo ?? ""}
                </p>
              </div>
              {midia?.tipo === "VIDEO" && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  <Video className="w-3 h-3" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma mídia encontrada.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMidia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedMidia(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedMidia(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMidia?.tipo === "FOTO" ? (
                <div className="relative aspect-video">
                  <Image
                    src={selectedMidia?.url ?? ""}
                    alt={selectedMidia?.titulo ?? ""}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={selectedMidia?.url ?? ""}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-semibold">{selectedMidia?.titulo ?? ""}</h3>
                {selectedMidia?.descricao && (
                  <p className="text-gray-300 mt-2">{selectedMidia.descricao}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
