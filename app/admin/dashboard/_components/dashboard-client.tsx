"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  Newspaper,
  Image,
  Users,
  TrendingUp,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateUTC } from "@/lib/utils";

interface DashboardClientProps {
  stats: {
    secretarias: number;
    licitacoes: number;
    noticias: number;
    midias: number;
    usuarios: number;
  };
  recentNoticias: any[];
  recentLicitacoes: any[];
  isAdmin: boolean;
  userName: string;
}

const statusLabels: Record<string, string> = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em Andamento",
  ENCERRADA: "Encerrada",
  SUSPENSA: "Suspensa",
  CANCELADA: "Cancelada"
};

export function DashboardClient({
  stats,
  recentNoticias,
  recentLicitacoes,
  isAdmin,
  userName
}: DashboardClientProps) {
  const statCards = [
    { label: "Secretarias", value: stats.secretarias, icon: Building2, color: "bg-blue-500", href: "/admin/secretarias", show: isAdmin },
    { label: "Licitações", value: stats.licitacoes, icon: FileText, color: "bg-blue-500", href: "/admin/licitacoes", show: true },
    { label: "Notícias", value: stats.noticias, icon: Newspaper, color: "bg-cyan-500", href: "/admin/noticias", show: true },
    { label: "Mídias", value: stats.midias, icon: Image, color: "bg-purple-500", href: "/admin/galeria", show: true },
    { label: "Usuários", value: stats.usuarios, icon: Users, color: "bg-pink-500", href: "/admin/usuarios", show: isAdmin }
  ].filter(s => s.show);

  return (
    <div className="space-y-6">
      {/* Saudação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Olá, {userName}!</h1>
        <p className="text-gray-600">Bem-vindo ao painel administrativo da Prefeitura de Lambari</p>
      </motion.div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Conteúdo Recente */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notícias Recentes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Notícias Recentes</CardTitle>
              <Link href="/admin/noticias">
                <Button variant="ghost" size="sm">
                  Ver todas <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(recentNoticias ?? []).map((noticia) => (
                  <div key={noticia?.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <Newspaper className="w-5 h-5 text-cyan-500 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{noticia?.titulo ?? ""}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {noticia?.createdAt && formatDateUTC(noticia.createdAt)}
                        {noticia?.secretaria && (
                          <Badge variant="secondary" className="text-xs">
                            {noticia.secretaria.sigla ?? noticia.secretaria.nome}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {(recentNoticias ?? []).length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhuma notícia cadastrada</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Licitações Recentes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Licitações Recentes</CardTitle>
              <Link href="/admin/licitacoes">
                <Button variant="ghost" size="sm">
                  Ver todas <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(recentLicitacoes ?? []).map((licitacao) => (
                  <div key={licitacao?.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {licitacao?.numero ?? ""} - {licitacao?.modalidade ?? ""}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {statusLabels[licitacao?.status ?? "ABERTA"]}
                        </Badge>
                        <Calendar className="w-3 h-3" />
                        {licitacao?.dataAbertura && formatDateUTC(licitacao.dataAbertura)}
                      </div>
                    </div>
                  </div>
                ))}
                {(recentLicitacoes ?? []).length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhuma licitação cadastrada</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
