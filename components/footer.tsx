"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Zap, MessageCircle } from "lucide-react";

interface FooterProps {
  config?: any;
}

export function Footer({ config }: FooterProps) {
  const [logoUrl, setLogoUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/6/6c/Brasao_lambari_mg100.jpg");
  const [nomeCidade, setNomeCidade] = useState("Lambari");
  const [slogan, setSlogan] = useState("Estância Hidromineral");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("contato@lambari.mg.gov.br");
  const [endereco, setEndereco] = useState("Rua Tiradentes, 165 - Centro\nLambari/MG - CEP: 37.480-000");
  const [horarioAtendimento, setHorarioAtendimento] = useState("Seg a Sex: 8h às 17h");

  useEffect(() => {
    if (config) {
      if (config.logoUrl) setLogoUrl(config.logoUrl);
      if (config.nomeCidade) setNomeCidade(config.nomeCidade);
      if (config.slogan) setSlogan(config.slogan);
      if (config.telefone) setTelefone(config.telefone);
      if (config.email) setEmail(config.email);
      if (config.endereco) setEndereco(config.endereco);
      if (config.horarioAtendimento) setHorarioAtendimento(config.horarioAtendimento);
    }
  }, [config]);

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Coluna 1: Logo e Descrição */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8 group">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full p-2 sm:p-2.5 shadow-xl flex-shrink-0 border-2 border-cyan-400/50 group-hover:border-cyan-300 group-hover:shadow-2xl transition-all duration-300">
                <Image
                  src={logoUrl}
                  alt="Logo da Prefeitura de Lambari"
                  fill
                  className="object-contain rounded-full p-0.5"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-white leading-tight group-hover:text-cyan-200 transition-colors duration-300">Prefeitura de {nomeCidade}</h3>
                <p className="text-cyan-300 text-sm sm:text-base font-semibold">{slogan}</p>
              </div>
            </div>
            <p className="text-blue-200 text-xs sm:text-sm leading-relaxed">
              Portal Oficial da Prefeitura de {nomeCidade}, a joia do Sul de Minas. Descubra a cidade onde as belezas naturais deslumbram e as águas minerais terapêuticas renovam o corpo e a alma.
            </p>
          </div>

          {/* Coluna 2: Endereço */}
          <div className="sm:col-span-1">
            <h4 className="font-bold text-base sm:text-lg mb-5 sm:mb-6 text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Localização
            </h4>
            <div className="flex gap-3 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-800 group-hover:bg-cyan-600 transition-colors flex items-center justify-center">
                <MapPin className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">Endereço</p>
                <p className="text-blue-100 text-sm whitespace-pre-line">{endereco}</p>
              </div>
            </div>
          </div>

          {/* Coluna 3: Horário + Redes Sociais */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {/* Horário de Atendimento */}
              <div>
                <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Horário
                </h4>
                <div className="bg-gradient-to-br from-blue-800 to-blue-900 border border-cyan-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200 text-sm sm:text-base font-medium">Atendimento</span>
                      <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                    <p className="text-white font-bold text-base sm:text-lg">{horarioAtendimento}</p>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h4 className="font-bold text-base sm:text-lg mb-6 text-white">Siga-nos</h4>
                <div className="flex gap-4 sm:gap-5">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/prefeituramunicipaldelambari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    title="Facebook"
                    aria-label="Siga-nos no Facebook"
                  >
                    <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg border border-blue-400/50">
                      <Facebook className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/prefeituramunicipaldelambari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    title="Instagram"
                    aria-label="Siga-nos no Instagram"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg border border-pink-400/50">
                      <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </a>

                  {/* YouTube */}
                  <a
                    href="#"
                    className="group relative"
                    title="YouTube"
                    aria-label="Visite nosso YouTube"
                  >
                    <div className="absolute inset-0 bg-red-600 rounded-xl blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg border border-red-400/50">
                      <Youtube className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={telefone ? `https://wa.me/55${telefone.replace(/\D/g, "")}?text=Olá%2C%20gostaria%20de%20entrar%20em%20contato%20com%20a%20Prefeitura%20de%20Lambari` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    title="WhatsApp"
                    aria-label="Contato via WhatsApp"
                  >
                    <div className="absolute inset-0 bg-green-600 rounded-xl blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg border border-green-400/50">
                      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-800/50"></div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-blue-300">
            © 2025 Prefeitura de <span className="font-semibold">{nomeCidade}</span> - MG
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-400">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Desenvolvido com dedicação</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
