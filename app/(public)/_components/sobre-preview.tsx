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
    <section className="py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6">
              Conheça <span className="text-blue-600">Lambari</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A Estância Hidromineral do Sul de Minas Gerais, famosa em todo o mundo por suas águas minerais terapêuticas e sua história rica em tradição
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Lambari é uma estância hidromineral localizada no coração do Sul de Minas Gerais, conhecida mundialmente por suas águas minerais com propriedades terapêuticas. A cidade encanta visitantes com o magnífico Parque das Águas, que abriga seis fontes de águas medicinais, além do icônico Cassino do Lago e do belo Lago Guanabara.
            </p>

            <div className="grid grid-cols-2 gap-5 mb-10">
              <motion.div 
                whileHover={{ y: -12, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)" }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-500"
              >
                <Droplets className="w-10 h-10 text-blue-500 flex-shrink-0 mb-3" />
                <div>
                  <p className="font-bold text-lg text-gray-900">6 Fontes</p>
                  <p className="text-sm text-gray-500">Águas Minerais</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -12, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)" }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-green-500"
              >
                <Mountain className="w-10 h-10 text-green-500 flex-shrink-0 mb-3" />
                <div>
                  <p className="font-bold text-lg text-gray-900">1.300m</p>
                  <p className="text-sm text-gray-500">Altitude</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -12, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)" }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-cyan-500"
              >
                <Building className="w-10 h-10 text-cyan-500 flex-shrink-0 mb-3" />
                <div>
                  <p className="font-bold text-lg text-gray-900">1911</p>
                  <p className="text-sm text-gray-500">Cassino do Lago</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -12, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)" }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-purple-500"
              >
                <Users className="w-10 h-10 text-purple-500 flex-shrink-0 mb-3" />
                <div>
                  <p className="font-bold text-lg text-gray-900">21 mil</p>
                  <p className="text-sm text-gray-500">Habitantes</p>
                </div>
              </motion.div>
            </div>

            <Link href="/sobre">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transition-all hover:scale-105">
                Saiba mais sobre Lambari
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Imagem Prefeito */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              whileHover={{ y: -20, rotateZ: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg/1280px-Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg"
                alt="Cassino do Lago - Lambari"
                width={600}
                height={400}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay de brilho */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-transparent opacity-0 group-hover:opacity-20"
                whileHover={{ opacity: 0.2 }}
              />
            </motion.div>
            
            {/* Sombra dinâmica */}
            <motion.div
              className="absolute -inset-4 bg-blue-600/10 rounded-2xl -z-10 blur-xl"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
