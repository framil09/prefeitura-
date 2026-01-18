"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Newspaper,
  Image,
  Users,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["ADMIN", "SECRETARIO", "EDITOR"] },
  { href: "/admin/secretarias", label: "Secretarias", icon: Building2, roles: ["ADMIN"] },
  { href: "/admin/licitacoes", label: "Licitações", icon: FileText, roles: ["ADMIN", "SECRETARIO"] },
  { href: "/admin/noticias", label: "Notícias", icon: Newspaper, roles: ["ADMIN", "SECRETARIO", "EDITOR"] },
  { href: "/admin/galeria", label: "Galeria", icon: Image, roles: ["ADMIN", "SECRETARIO", "EDITOR"] },
  { href: "/admin/usuarios", label: "Usuários", icon: Users, roles: ["ADMIN"] }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession() || {};
  const userRole = (session?.user as any)?.role ?? "EDITOR";

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg hidden lg:block">
      <nav className="p-4 space-y-1">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
