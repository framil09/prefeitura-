"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Mountain, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SobrePreviewProps {
  config: any;
}

export function SobrePreview({ config }: SobrePreviewProps) {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Conheça <span className="text-blue-700">Lambari</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Lambari é uma estância hidromineral localizada no Sul de Minas Gerais, conhecida mundialmente por suas águas minerais terapêuticas. A cidade encanta visitantes com o Parque das Águas, que abriga seis fontes de águas medicinais, além do histórico Cassino do Lago e o belo Lago Guanabara.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Droplets className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800">6 Fontes</p>
                  <p className="text-xs text-gray-500">Águas Minerais</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Mountain className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800">1.300m</p>
                  <p className="text-xs text-gray-500">Serra das Águas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Building className="w-8 h-8 text-cyan-500" />
                <div>
                  <p className="font-semibold text-gray-800">1911</p>
                  <p className="text-xs text-gray-500">Cassino do Lago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="font-semibold text-gray-800">~20 mil</p>
                  <p className="text-xs text-gray-500">Habitantes</p>
                </div>
              </div>
            </div>

            <Link href="/sobre">
              <Button>
                Saiba mais sobre Lambari
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Imagem Prefeito */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg/1280px-Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg"
                alt="Cassino do Lago - Lambari"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            
            {/* Card Gestão */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-[250px]">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={config?.fotoPrefeito ?? "https://cdn.abacus.ai/images/7b768035-68ae-4390-85c9-def7c95e7a47.png"}
                    alt="Prefeito"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{config?.prefeito ?? "Leonardo Framil"}</p>
                  <p className="text-xs text-blue-600">Prefeito Municipal</p>
                  <p className="text-xs text-gray-500">Gestão 2025-2028</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
