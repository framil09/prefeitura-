"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface WhatsAppFloatingButtonProps {
  telefone?: string;
  nomeCidade?: string;
}

export function WhatsAppFloatingButton({
  telefone = "",
  nomeCidade = "Lambari",
}: WhatsAppFloatingButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const telefoneFormatado = telefone ? telefone.replace(/\D/g, "") : "";
  const whatsappLink = telefoneFormatado
    ? `https://wa.me/55${telefoneFormatado}?text=Olá%2C%20gostaria%20de%20entrar%20em%20contato%20com%20a%20Prefeitura%20de%20${nomeCidade}`
    : "#";

  const handleScroll = () => {
    // Mostra/oculta baseado na posição
    setIsVisible(window.scrollY < window.innerHeight * 3);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!telefoneFormatado || isClosed) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Anel de animação */}
      <div className="absolute inset-0 rounded-full bg-green-500/30 animate-pulse -m-1 sm:-m-2"></div>
      <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping -m-2 sm:-m-4"></div>

      {/* Botão principal */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#25D366] rounded-full shadow-xl sm:shadow-2xl hover:shadow-green-500/60 transition-all duration-300 group ${
          isHovered ? "scale-110 sm:scale-125 -translate-y-2 sm:-translate-y-3 shadow-green-500/80" : "scale-100"
        }`}
        title="Contate-nos pelo WhatsApp"
        aria-label="Abrir WhatsApp"
      >
        {/* Efeito de brilho */}
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Ícone SVG do WhatsApp - Oficial */}
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.559 4.224 1.621 6.087L0 24l6.486-1.91C8.476 23.404 10.188 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.567 0-3.099-.368-4.468-1.065l-.606-.325-4.134 1.215 1.21-4.115-.325-.606C1.375 15.099 1 13.567 1 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z"/>
          <path d="M16.674 13.883c-.28-.14-1.65-.815-1.91-.907-.262-.094-.451-.14-.639.14-.188.282-.729.911-.892 1.099-.162.188-.325.211-.605.07-.282-.14-1.19-.438-2.266-1.398-.838-.746-1.402-1.668-1.567-1.95-.162-.282-.017-.435.122-.574.126-.126.282-.328.424-.492.14-.163.187-.282.282-.47.093-.188.047-.352-.024-.492-.07-.14-.638-1.532-.875-2.096-.23-.55-.463-.475-.639-.485-.164-.008-.352-.008-.54-.008-.188 0-.494.07-.752.354-.258.282-.988.964-.988 2.35 0 1.387 1.012 2.726 1.151 2.914.14.188 1.987 3.04 4.823 4.265.676.291 1.2.466 1.61.595.676.216 1.292.186 1.777.112.543-.08 1.67-.684 1.904-1.344.234-.66.234-1.224.165-1.344-.07-.12-.258-.19-.544-.33"/>
        </svg>
      </a>

      {/* Tooltip que aparece ao hover */}
      {isHovered && (
        <div className="absolute bottom-20 sm:bottom-24 right-0 animate-fadeIn">
          <div className="bg-gray-900 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-2xl whitespace-nowrap text-xs sm:text-sm font-semibold flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.559 4.224 1.621 6.087L0 24l6.486-1.91C8.476 23.404 10.188 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.567 0-3.099-.368-4.468-1.065l-.606-.325-4.134 1.215 1.21-4.115-.325-.606C1.375 15.099 1 13.567 1 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z"/>
              <path d="M16.674 13.883c-.28-.14-1.65-.815-1.91-.907-.262-.094-.451-.14-.639.14-.188.282-.729.911-.892 1.099-.162.188-.325.211-.605.07-.282-.14-1.19-.438-2.266-1.398-.838-.746-1.402-1.668-1.567-1.95-.162-.282-.017-.435.122-.574.126-.126.282-.328.424-.492.14-.163.187-.282.282-.47.093-.188.047-.352-.024-.492-.07-.14-.638-1.532-.875-2.096-.23-.55-.463-.475-.639-.485-.164-.008-.352-.008-.54-.008-.188 0-.494.07-.752.354-.258.282-.988.964-.988 2.35 0 1.387 1.012 2.726 1.151 2.914.14.188 1.987 3.04 4.823 4.265.676.291 1.2.466 1.61.595.676.216 1.292.186 1.777.112.543-.08 1.67-.684 1.904-1.344.234-.66.234-1.224.165-1.344-.07-.12-.258-.19-.544-.33"/>
            </svg>
            <span className="hidden sm:inline">Fale conosco no WhatsApp!</span>
            <span className="sm:hidden">WhatsApp</span>
            <div className="absolute top-full right-3 sm:right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* Botão de fechar (discreto) */}
      <button
        onClick={() => setIsClosed(true)}
        className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-7 sm:h-7 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
        title="Fechar"
        aria-label="Fechar WhatsApp"
      >
        <X className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
