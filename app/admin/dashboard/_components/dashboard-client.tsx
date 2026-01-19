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
  ArrowRight,
  BarChart3,
  Activity,
  Clock
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
    { label: "Secretarias", value: stats.secretarias, icon: Building2, gradient: "from-blue-500 to-blue-600", href: "/admin/secretarias", show: isAdmin },
    { label: "Licitações", value: stats.licitacoes, icon: FileText, gradient: "from-purple-500 to-purple-600", href: "/admin/licitacoes", show: true },
    { label: "Notícias", value: stats.noticias, icon: Newspaper, gradient: "from-cyan-500 to-cyan-600", href: "/admin/noticias", show: true },
    { label: "Mídias", value: stats.midias, icon: Image, gradient: "from-emerald-500 to-emerald-600", href: "/admin/galeria", show: true },
    { label: "Usuários", value: stats.usuarios, icon: Users, gradient: "from-amber-500 to-amber-600", href: "/admin/usuarios", show: isAdmin }
  ].filter(s => s.show);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header com Saudação */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-200 pb-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Bem-vindo, {userName.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-500 text-lg">
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium">Sistema Online</span>
          </div>
        </div>
      </motion.div>

      {/* Cards de Estatísticas */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((stat, index) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Link href={stat.href}>
              <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Seção de Conteúdo Recente */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-gray-700" />
          Atividade Recente
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Notícias Recentes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Newspaper className="w-5 h-5 text-cyan-600" />
                    </div>
                    <CardTitle className="text-gray-900">Notícias Recentes</CardTitle>
                  </div>
                  <Link href="/admin/noticias">
                    <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                      Ver todas <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {(recentNoticias ?? []).map((noticia, idx) => (
                    <motion.div
                      key={noticia?.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="p-4 border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 line-clamp-2">{noticia?.titulo ?? ""}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {noticia?.createdAt && formatDateUTC(noticia.createdAt)}
                            </div>
                            {noticia?.secretaria && (
                              <Badge variant="secondary" className="text-xs bg-cyan-100 text-cyan-700 hover:bg-cyan-200">
                                {noticia.secretaria.sigla ?? noticia.secretaria.nome}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {(recentNoticias ?? []).length === 0 && (
                    <div className="p-8 text-center">
                      <Newspaper className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Nenhuma notícia cadastrada</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Licitações Recentes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-gray-900">Licitações Recentes</CardTitle>
                  </div>
                  <Link href="/admin/licitacoes">
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                      Ver todas <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {(recentLicitacoes ?? []).map((licitacao, idx) => (
                    <motion.div
                      key={licitacao?.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="p-4 border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">
                            {licitacao?.numero ?? ""} - {licitacao?.modalidade ?? ""}
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              licitacao?.status === "ABERTA" ? "bg-green-100 text-green-700" :
                              licitacao?.status === "EM_ANDAMENTO" ? "bg-blue-100 text-blue-700" :
                              licitacao?.status === "ENCERRADA" ? "bg-gray-100 text-gray-700" :
                              licitacao?.status === "SUSPENSA" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {statusLabels[licitacao?.status ?? "ABERTA"]}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {licitacao?.dataAbertura && formatDateUTC(licitacao.dataAbertura)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {(recentLicitacoes ?? []).length === 0 && (
                    <div className="p-8 text-center">
                      <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Nenhuma licitação cadastrada</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
