"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 bg-white rounded-full p-1">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Brasao_lambari_mg100.jpg"
                  alt="Brasão de Lambari"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Prefeitura de Lambari</h3>
                <p className="text-cyan-300 text-sm">Estância Hidromineral</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm">
              Portal oficial da Prefeitura Municipal de Lambari, cidade conhecida pelas águas minerais terapêuticas no Sul de Minas Gerais.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-cyan-300">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Sobre Lambari
                </Link>
              </li>
              <li>
                <Link href="/secretarias" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Secretarias
                </Link>
              </li>
              <li>
                <Link href="/licitacoes" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Licitações
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Notícias
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-cyan-300">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-blue-200">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Rua Tiradentes, 165 - Centro<br />Lambari/MG - CEP: 37.480-000</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-blue-200">
                <Phone className="w-4 h-4" />
                <span>0800 035 4011</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-blue-200">
                <Mail className="w-4 h-4" />
                <span>contato@lambari.mg.gov.br</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-blue-200">
                <Clock className="w-4 h-4" />
                <span>Seg a Sex: 8h às 17h</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-cyan-300">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/prefeituramunicipaldelambari"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/prefeituramunicipaldelambari"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-blue-300">
          <p>© 2025 Prefeitura Municipal de Lambari - MG. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
