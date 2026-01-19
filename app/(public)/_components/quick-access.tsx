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
  PenTool,
  Home,
  Receipt,
  Droplet,
  Lightbulb,
  Landmark,
  Gavel,
  BookOpen,
  Users2,
  ArrowUpRight
} from "lucide-react";

const quickLinks = [
  {
    href: "/licitacoes",
    label: "Licitações",
    description: "Processos de licitação",
    icon: FileText,
    color: "from-blue-500 to-blue-600"
  },
  {
    href: "/secretarias",
    label: "Secretarias",
    description: "Secretarias municipais",
    icon: Building2,
    color: "from-blue-600 to-blue-700"
  },
  {
    href: "/noticias",
    label: "Notícias",
    description: "Últimas notícias",
    icon: Newspaper,
    color: "from-cyan-500 to-cyan-600"
  },
  {
    href: "/ouvidoria",
    label: "Ouvidoria",
    description: "Fale conosco",
    icon: Phone,
    color: "from-blue-500 to-blue-600"
  },
  {
    href: "https://lambari-mg.portaltp.com.br/",
    label: "Transparência",
    description: "Portal de transparência",
    icon: Scale,
    color: "from-cyan-600 to-cyan-700",
    external: true
  },
  {
    href: "/sobre#gestao",
    label: "Gestão",
    description: "Administração atual",
    icon: Users,
    color: "from-blue-600 to-blue-700"
  },
  {
    href: "/emendas-impositivas",
    label: "Emenda Impositiva",
    description: "Emendas municipais",
    icon: PenTool,
    color: "from-cyan-500 to-cyan-600"
  },
  {
    href: "https://nfe.sgpcloud.net:9075/servicosweb/home.jsf",
    label: "IPTU",
    description: "Consultar IPTU",
    icon: Home,
    color: "from-blue-500 to-blue-600",
    external: true
  },
  {
    href: "#",
    label: "Nota Fiscal",
    description: "NFC-e",
    icon: Receipt,
    color: "from-cyan-500 to-cyan-600"
  },
  {
    href: "https://www.saaelambari.mg.gov.br/",
    label: "SAAE",
    description: "Abastecimento de água",
    icon: Droplet,
    color: "from-blue-600 to-blue-700",
    external: true
  },
  {
    href: "#",
    label: "Iluminação Pública",
    description: "Solicitar manutenção",
    icon: Lightbulb,
    color: "from-cyan-500 to-cyan-600"
  },
  {
    href: "https://www.previlam.mg.gov.br/",
    label: "Previlam",
    description: "Vigilância sanitária",
    icon: Landmark,
    color: "from-blue-700 to-blue-800",
    external: true
  },
  {
    href: "https://www.camaralambari.mg.gov.br/Default16.aspx",
    label: "Câmara Municipal",
    description: "Câmara de vereadores",
    icon: Gavel,
    color: "from-blue-600 to-blue-700",
    external: true
  },
  {
    href: "https://imprensaoficialmunicipal.com.br/lambari",
    label: "Diário Oficial",
    description: "Publicações oficiais",
    icon: BookOpen,
    color: "from-cyan-600 to-cyan-700",
    external: true
  },
  {
    href: "https://cce.sgpcloud.net:9075/sipweb/",
    label: "Servidores Municipal",
    description: "Dados de servidores",
    icon: Users2,
    color: "from-blue-700 to-blue-800",
    external: true
  }
];

export function QuickAccess() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Acesso Rápido
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Acesse rapidamente os serviços mais utilizados da prefeitura
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                className="group h-full"
              >
                <div className={`relative h-full p-5 rounded-2xl bg-gradient-to-br ${link.color} text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-start justify-between`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mt-12"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 w-full">
                    <div className="flex items-start justify-between mb-3">
                      <link.icon className="w-8 h-8 text-white/90" />
                      {link.external && (
                        <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="relative z-10 w-full">
                    <h3 className="font-bold text-base leading-tight mb-1">
                      {link.label}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {link.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center"
        >
          <p className="text-gray-700">
            <span className="font-semibold">💡 Dica:</span> Todos os serviços estão disponíveis também no menu principal do site
          </p>
        </motion.div>
      </div>
    </section>
  );
}
