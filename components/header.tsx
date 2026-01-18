"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  Building2,
  FileText,
  Newspaper,
  Image as ImageIcon,
  Phone,
  ChevronDown,
  MapPin,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/weather-widget";

const menuItems = [
  { href: "/", label: "Início", icon: Home },
  {
    label: "A Cidade",
    icon: Info,
    submenu: [
      { href: "/sobre", label: "Sobre Lambari" },
      { href: "/sobre#historia", label: "História" },
      { href: "/sobre#turismo", label: "Turismo" },
      { href: "/sobre#gestao", label: "Gestão Municipal" }
    ]
  },
  { href: "/secretarias", label: "Secretarias", icon: Building2 },
  { href: "/licitacoes", label: "Licitações", icon: FileText },
  { href: "/noticias", label: "Notícias", icon: Newspaper },
  { href: "/galeria", label: "Galeria", icon: ImageIcon },
  { href: "/contato", label: "Contato", icon: Phone }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-blue-800/95 backdrop-blur-sm shadow-lg">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-1 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              0800 035 4011
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Lambari - MG
            </span>
            <span className="hidden md:block border-l border-blue-700 pl-4">
              <WeatherWidget compact />
            </span>
          </div>
          <Link
            href="/admin/login"
            className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
          >
            <Users className="w-3 h-3" />
            Área Restrita
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-white rounded-full p-1">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Brasao_lambari_mg100.jpg"
                alt="Brasão de Lambari"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg leading-tight">Prefeitura de Lambari</h1>
              <p className="text-xs text-cyan-300">Estância Hidromineral</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems?.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-white hover:bg-blue-700 rounded-md transition-colors text-sm font-medium"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-white hover:bg-blue-700 rounded-md transition-colors text-sm font-medium"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl py-2 min-w-[200px]"
                    >
                      {item.submenu?.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-800 text-sm font-medium"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-blue-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-blue-700"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {menuItems?.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:bg-blue-600 rounded-md"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2 text-white font-medium">
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </div>
                      <div className="ml-8 space-y-1">
                        {item.submenu?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-1.5 text-blue-100 hover:text-white text-sm"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
