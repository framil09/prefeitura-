"use client";

import { useState, useEffect } from "react";
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
  Phone,
  ChevronDown,
  MapPin,
  Users,
  ZoomIn,
  ZoomOut,
  Map,
  Contrast
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/weather-widget";

interface HeaderProps {
  config?: any;
}

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
  { href: "/editais", label: "Editais", icon: FileText },
  { href: "/transparencia", label: "Transparência", icon: FileText },
  { href: "/contato", label: "Contato", icon: Phone }
];

export function Header({ config }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/6/6c/Brasao_lambari_mg100.jpg");
  const [nomeCidade, setNomeCidade] = useState("Lambari");
  const [slogan, setSlogan] = useState("Estância Hidromineral");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (config) {
      if (config.logoUrl) setLogoUrl(config.logoUrl);
      if (config.nomeCidade) setNomeCidade(config.nomeCidade);
      if (config.slogan) setSlogan(config.slogan);
    }
  }, [config]);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 10, 150);
    setZoomLevel(newZoom);
    document.documentElement.style.fontSize = `${(newZoom / 100) * 16}px`;
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 10, 80);
    setZoomLevel(newZoom);
    document.documentElement.style.fontSize = `${(newZoom / 100) * 16}px`;
  };

  const resetZoom = () => {
    setZoomLevel(100);
    document.documentElement.style.fontSize = "16px";
  };

  const toggleHighContrast = () => {
    const isEnabled = !highContrast;
    setHighContrast(isEnabled);
    if (isEnabled) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-800/95 backdrop-blur-sm shadow-lg">
      {/* Top Bar */}
      <div className="bg-blue-800/95 text-white py-2 text-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="hidden sm:flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{nomeCidade} - MG</span>
            </div>
            <span className="hidden md:block border-l border-blue-700 pl-4">
              <WeatherWidget compact />
            </span>
          </div>

          {/* Acessibilidade e Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mapa do Site */}
            <Link
              href="/mapasite"
              className="flex items-center justify-center p-1.5 rounded-lg bg-blue-700/50 hover:bg-blue-600/70 border border-blue-600/50 hover:border-blue-400 text-cyan-300 hover:text-cyan-100 transition-all duration-300"
              title="Mapa do Site"
              aria-label="Mapa do Site"
            >
              <Map className="w-4 h-4" />
            </Link>

            {/* Contraste */}
            <button
              onClick={toggleHighContrast}
              className={`flex items-center justify-center p-1.5 rounded-lg border transition-all duration-300 ${
                highContrast
                  ? "bg-yellow-500/40 border-yellow-400 text-yellow-200 hover:bg-yellow-500/60"
                  : "bg-blue-700/50 hover:bg-blue-600/70 border-blue-600/50 hover:border-blue-400 text-cyan-300 hover:text-cyan-100"
              }`}
              title={highContrast ? "Desativar Contraste Alto" : "Ativar Contraste Alto"}
              aria-label={highContrast ? "Desativar Contraste Alto" : "Ativar Contraste Alto"}
            >
              <Contrast className="w-4 h-4" />
            </button>

            {/* Diminuir Fonte */}
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 80}
              className="flex items-center justify-center p-1.5 rounded-lg bg-blue-700/50 hover:bg-blue-600/70 border border-blue-600/50 hover:border-blue-400 text-cyan-300 hover:text-cyan-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Diminuir fonte (A-)"
              aria-label="Diminuir tamanho da fonte"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Aumentar Fonte */}
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              className="flex items-center justify-center p-1.5 rounded-lg bg-blue-700/50 hover:bg-blue-600/70 border border-blue-600/50 hover:border-blue-400 text-cyan-300 hover:text-cyan-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Aumentar fonte (A+)"
              aria-label="Aumentar tamanho da fonte"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Portal Admin */}
            <Link
              href="/admin/login"
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 transition-all duration-300 text-xs sm:text-sm font-medium"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Portal Admin</span>
              <span className="sm:hidden">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full p-2 shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300 flex-shrink-0 border-2 border-white/80">
              <Image
                src={logoUrl}
                alt="Logo da Prefeitura de Lambari"
                fill
                className="object-contain rounded-full p-0.5"
                priority
              />
            </div>
            <div className="text-white min-w-0">
              <p className="text-xs sm:text-sm text-gray-200">Prefeitura de Lambari</p>
              <h1 className="font-bold text-sm sm:text-base lg:text-lg leading-tight group-hover:text-cyan-200 transition-colors duration-300 whitespace-nowrap">{slogan}</h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
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
