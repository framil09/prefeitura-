"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // Chamar todos os hooks incondicionalmente no topo
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  // Verificar autenticação
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated" && mounted) {
      router.push("/admin/login");
    }
  }, [status, mounted, router]);
  
  // Página de login tem seu próprio layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main id="main-content" className="flex-1 p-6 lg:ml-64">{children}</main>
        </div>
      </div>
    );
  }

  // Se está redirecionando, mostrar carregamento
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando para login...</p>
      </div>
    </div>
  );
}
