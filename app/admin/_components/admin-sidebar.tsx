"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Newspaper,
  Image,
  Users,
  Award,
  Sliders,
  PenTool,
  Mountain,
  Lock,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  href: string;
  label: string;
  icon: any;
  roles: string[];
  external?: boolean;
  secao?: string;
}

const menuItems: MenuItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["ADMIN", "SECRETARIO", "EDITOR"], secao: "DASHBOARD" },
  { href: "/admin/gestao", label: "Gestão Municipal", icon: Award, roles: ["ADMIN"], secao: "GESTAO_MUNICIPAL" },
  { href: "/admin/secretarias", label: "Secretarias", icon: Building2, roles: ["ADMIN"], secao: "SECRETARIAS" },
  { href: "/admin/turismo", label: "Turismo", icon: Mountain, roles: ["ADMIN", "SECRETARIO"], secao: "TURISMO" },
  { href: "/admin/licitacoes", label: "Licitações", icon: FileText, roles: ["ADMIN", "SECRETARIO"], secao: "LICITACOES" },
  { href: "/admin/editais", label: "Editais e Chamadas", icon: FileText, roles: ["ADMIN", "SECRETARIO"], secao: "EDITAIS_CHAMADAS" },
  { href: "/admin/emendas-impositivas", label: "Emendas Impositivas", icon: PenTool, roles: ["ADMIN", "SECRETARIO"], secao: "EMENDAS_IMPOSITIVAS" },
  { href: "/admin/noticias", label: "Notícias", icon: Newspaper, roles: ["ADMIN", "SECRETARIO", "EDITOR"], secao: "NOTICIAS" },
  { href: "/admin/galeria", label: "Galeria", icon: Image, roles: ["ADMIN", "SECRETARIO", "EDITOR"], secao: "GALERIA" },
  { href: "/admin/usuarios", label: "Usuários", icon: Users, roles: ["ADMIN"], secao: "USUARIOS" },
  { href: "/admin/permissoes", label: "Permissões", icon: Shield, roles: ["ADMIN"], secao: "CONFIGURACAO" },
  { href: "/admin/configuracao", label: "Configurações", icon: Sliders, roles: ["ADMIN"], secao: "CONFIGURACAO" }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession() || { data: null };
  const userRole = session?.user?.role as string ?? "EDITOR";
  const userId = session?.user?.id as string ?? "";
  
  const [permissoes, setPermissoes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Buscar permissões do usuário
  useEffect(() => {
    const fetchPermissoes = async () => {
      if (!userId || userId.trim() === "") {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/permissoes/${userId}`);
        if (response.ok) {
          const data = await response.json();
          // Converter array de permissões em um objeto
          const permissoesMap: Record<string, boolean> = {};
          data.forEach((p: any) => {
            permissoesMap[p.secao] = p.permitido;
          });
          setPermissoes(permissoesMap);
        }
      } catch (error) {
        console.error("Erro ao buscar permissões:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissoes();
  }, [userId]);

  // Verificar se usuário tem acesso a uma seção
  const temAcesso = (item: MenuItem): boolean => {
    // Se não tiver role necessário, bloqueia
    if (!item.roles.includes(userRole)) {
      return false;
    }

    // Se não tiver secao definida, permite (é dashboard)
    if (!item.secao) {
      return true;
    }

    // Se for ADMIN, sempre permite
    if (userRole === "ADMIN") {
      return true;
    }

    // Se for outro role, verifica permissões específicas
    // Se não tiver permissões definidas, permite (fallback)
    if (Object.keys(permissoes).length === 0) {
      return true;
    }

    // Verifica a permissão específica da seção
    return permissoes[item.secao] !== false;
  };

  const filteredMenu = menuItems.filter(temAcesso);

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-sky-100 via-cyan-50 to-white shadow-lg hidden lg:block border-r border-cyan-200">
      <nav className="p-6 space-y-2">
        {filteredMenu.map((item) => {
          const isActive = !item.external && (pathname === item.href || pathname?.startsWith(item.href + "/"));
          const isExternal = item.external;
          
          const content = (
            <>
              <item.icon className="w-5 h-5" />
              {item.label}
            </>
          );

          if (isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  "text-gray-600 hover:bg-sky-200/40 hover:text-sky-700"
                )}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-sky-400 to-cyan-400 text-white font-medium shadow-md"
                  : "text-gray-600 hover:bg-sky-200/40 hover:text-sky-700"
              )}
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
