"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GaleriaPreviewProps {
  midias: any[];
}

export function GaleriaPreview({ midias }: GaleriaPreviewProps) {
  const safeMidias = midias ?? [];

  if (safeMidias.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold">Galeria de Fotos</h2>
            <p className="text-gray-400 mt-1">As belezas naturais de Lambari em imagens</p>
          </div>
          <Link href="/galeria">
            <Button variant="secondary">
              Ver galeria completa
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {safeMidias.map((midia, index) => (
            <motion.div
              key={midia?.id ?? index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={midia?.url ?? ""}
                alt={midia?.titulo ?? "Foto de Lambari"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center p-2">
                  <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs font-medium line-clamp-2">{midia?.titulo ?? ""}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
