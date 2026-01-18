"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Calendar, DollarSign, Building2, Search, Filter, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDateTimeUTC } from "@/lib/utils";

interface LicitacoesClientProps {
  licitacoes: any[];
}

const statusColors: Record<string, string> = {
  ABERTA: "success",
  EM_ANDAMENTO: "warning",
  ENCERRADA: "secondary",
  SUSPENSA: "info",
  CANCELADA: "destructive"
};

const statusLabels: Record<string, string> = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em Andamento",
  ENCERRADA: "Encerrada",
  SUSPENSA: "Suspensa",
  CANCELADA: "Cancelada"
};

export function LicitacoesClient({ licitacoes }: LicitacoesClientProps) {
  const safeLicitacoes = licitacoes ?? [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const filtered = safeLicitacoes.filter((lic) => {
    const matchSearch = !search || 
      lic?.numero?.toLowerCase()?.includes(search.toLowerCase()) ||
      lic?.objeto?.toLowerCase()?.includes(search.toLowerCase()) ||
      lic?.modalidade?.toLowerCase()?.includes(search.toLowerCase());
    const matchStatus = !statusFilter || lic?.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por número, objeto ou modalidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos os Status</option>
                <option value="ABERTA">Aberta</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="ENCERRADA">Encerrada</option>
                <option value="SUSPENSA">Suspensa</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-gray-500 self-center">
                {filtered.length} licitação(es) encontrada(s)
              </p>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="space-y-4">
          {filtered.map((licitacao, index) => (
            <motion.div
              key={licitacao?.id ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={statusColors[licitacao?.status ?? "ABERTA"] as any}>
                          {statusLabels[licitacao?.status ?? "ABERTA"]}
                        </Badge>
                        <span className="font-mono text-sm text-gray-500">
                          Nº {licitacao?.numero ?? "---"}
                        </span>
                        <span className="text-sm text-blue-600 font-medium">
                          {licitacao?.modalidade ?? ""}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {licitacao?.objeto ?? "Sem objeto"}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Abertura: {licitacao?.dataAbertura ? formatDateTimeUTC(licitacao.dataAbertura) : "---"}
                        </span>
                        {licitacao?.valorEstimado && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            R$ {Number(licitacao.valorEstimado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        )}
                        {licitacao?.secretaria && (
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {licitacao.secretaria.sigla ?? licitacao.secretaria.nome}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/licitacoes/${licitacao?.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Detalhes
                        </Button>
                      </Link>
                      {licitacao?.editalUrl && (
                        <a href={licitacao.editalUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            Edital
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma licitação encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
