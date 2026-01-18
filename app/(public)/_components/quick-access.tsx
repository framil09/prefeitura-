"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  Newspaper,
  Phone,
  Scale,
  Users,
  Heart,
  GraduationCap
} from "lucide-react";

const quickLinks = [
  {
    href: "/licitacoes",
    label: "Licitações",
    icon: FileText,
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    href: "/secretarias",
    label: "Secretarias",
    icon: Building2,
    color: "bg-blue-600 hover:bg-blue-700"
  },
  {
    href: "/noticias",
    label: "Notícias",
    icon: Newspaper,
    color: "bg-cyan-500 hover:bg-cyan-600"
  },
  {
    href: "/contato",
    label: "Ouvidoria",
    icon: Phone,
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    href: "https://lambari-mg.portaltp.com.br/",
    label: "Transparência",
    icon: Scale,
    color: "bg-teal-500 hover:bg-teal-600",
    external: true
  },
  {
    href: "/secretarias",
    label: "Assistência Social",
    icon: Heart,
    color: "bg-pink-500 hover:bg-pink-600"
  },
  {
    href: "/secretarias",
    label: "Educação",
    icon: GraduationCap,
    color: "bg-indigo-500 hover:bg-indigo-600"
  },
  {
    href: "/sobre#gestao",
    label: "Gestão",
    icon: Users,
    color: "bg-orange-500 hover:bg-orange-600"
  }
];

export function QuickAccess() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-center text-gray-800 mb-8"
        >
          Acesso Rápido
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickLinks?.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`flex flex-col items-center justify-center p-4 rounded-xl ${link.color} text-white transition-all hover:scale-105 hover:shadow-lg aspect-square`}
              >
                <link.icon className="w-8 h-8 mb-2" />
                <span className="text-xs font-medium text-center leading-tight">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
