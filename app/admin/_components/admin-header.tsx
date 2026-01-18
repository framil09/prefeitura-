"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const { data: session } = useSession() || {};
  const user = session?.user as any;

  return (
    <header className="sticky top-0 z-40 bg-blue-800 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="relative w-10 h-10 bg-white rounded-full p-0.5">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Brasao_lambari_mg100.jpg"
                alt="Brasão"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="hidden md:block">
              <p className="font-semibold">Painel Administrativo</p>
              <p className="text-xs text-blue-200">Prefeitura de Lambari</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
              <Home className="w-4 h-4 mr-2" />
              Ver Site
            </Button>
          </Link>
          
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name ?? "Usuário"}</p>
                <p className="text-xs text-blue-200">
                  {user?.role === "ADMIN" ? "Administrador" : 
                   user?.role === "SECRETARIO" ? "Secretário" : "Editor"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-700"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
