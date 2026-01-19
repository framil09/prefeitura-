"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  config: any;
}

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={config?.bannerUrl || "https://i.ytimg.com/vi/kWCoXWkowYE/maxresdefault.jpg"}
          alt="Banner do município"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-300 font-medium">{config?.nomeCidade || "Lambari"}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Bem-vindo a{" "}
            <span className="text-cyan-400">{config?.nomeCidade || "Lambari"}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            {config?.slogan || "Terra das Águas Virtuosas"} - Conheça o portal oficial da Prefeitura Municipal e descubra os serviços, notícias e a beleza natural do Sul de Minas.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/sobre">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Conheça Lambari
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
