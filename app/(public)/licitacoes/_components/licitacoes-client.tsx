"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Calendar, DollarSign, Building2, Search, Filter, Eye, MapPin, Phone, Mail, Link2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDateTimeUTC } from "@/lib/utils";

interface LicitacoesClientProps {
  licitacoes: any[];
}

const statusColors: Record<string, string> = {
  ABERTA: "bg-green-100 text-green-800 border-green-300",
  EM_ANDAMENTO: "bg-blue-100 text-blue-800 border-blue-300",
  ENCERRADA: "bg-gray-100 text-gray-800 border-gray-300",
  SUSPENSA: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CANCELADA: "bg-red-100 text-red-800 border-red-300"
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
      lic?.modalidade?.toLowerCase()?.includes(search.toLowerCase()) ||
      lic?.descricaoDetalhada?.toLowerCase()?.includes(search.toLowerCase());
    const matchStatus = !statusFilter || lic?.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-t-4 border-cyan-500">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtrar Licitações</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por número, objeto ou modalidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-cyan-200 focus:border-cyan-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-cyan-200 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
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
              <p className="text-sm text-gray-600 self-center font-semibold">
                📋 {filtered.length} licitação(ões) encontrada(s)
              </p>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="space-y-5">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">Nenhuma licitação encontrada com os filtros selecionados.</p>
            </div>
          ) : (
            filtered.map((licitacao, index) => (
              <motion.div
                key={licitacao?.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-xl transition-all border-l-4 border-cyan-400 hover:border-cyan-600">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header com status e número */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[licitacao?.status ?? "ABERTA"]}`}>
                            {statusLabels[licitacao?.status ?? "ABERTA"]}
                          </div>
                          <span className="font-mono text-sm font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded">
                            Nº {licitacao?.numero ?? "---"}
                          </span>
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            {licitacao?.modalidade ?? ""}
                          </Badge>
                        </div>
                      </div>

                      {/* Título */}
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                          {licitacao?.objeto ?? "Sem objeto"}
                        </h3>
                        {licitacao?.descricaoDetalhada && (
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {licitacao.descricaoDetalhada}
                          </p>
                        )}
                      </div>

                      {/* Informações principais */}
                      <div className="grid md:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm">
                              <strong>Abertura:</strong> {licitacao?.dataAbertura ? formatDateTimeUTC(licitacao.dataAbertura) : "---"}
                            </span>
                          </div>
                          {licitacao?.dataEncerramento && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="w-4 h-4 text-cyan-600" />
                              <span className="text-sm">
                                <strong>Encerramento:</strong> {formatDateTimeUTC(licitacao.dataEncerramento)}
                              </span>
                            </div>
                          )}
                          {licitacao?.valorEstimado && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <DollarSign className="w-4 h-4 text-cyan-600" />
                              <span className="text-sm font-semibold">
                                R$ {Number(licitacao.valorEstimado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          {licitacao?.local && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-4 h-4 text-cyan-600" />
                              <span className="text-sm">
                                <strong>Local:</strong> {licitacao.local}
                              </span>
                            </div>
                          )}
                          {licitacao?.secretaria && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Building2 className="w-4 h-4 text-cyan-600" />
                              <span className="text-sm">
                                <strong>Secretaria:</strong> {licitacao.secretaria.sigla ?? licitacao.secretaria.nome}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Informações de contato */}
                      {(licitacao?.contactoPessoa || licitacao?.contactoEmail || licitacao?.contactoTelefone) && (
                        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                          <h4 className="font-semibold text-sky-900 mb-2 text-sm">Informações de Contato</h4>
                          <div className="space-y-1">
                            {licitacao?.contactoPessoa && (
                              <p className="text-sm text-sky-800">
                                <strong>Responsável:</strong> {licitacao.contactoPessoa}
                              </p>
                            )}
                            {licitacao?.contactoEmail && (
                              <div className="flex items-center gap-2 text-sm text-sky-800">
                                <Mail className="w-4 h-4" />
                                <a href={`mailto:${licitacao.contactoEmail}`} className="hover:underline">
                                  {licitacao.contactoEmail}
                                </a>
                              </div>
                            )}
                            {licitacao?.contactoTelefone && (
                              <div className="flex items-center gap-2 text-sm text-sky-800">
                                <Phone className="w-4 h-4" />
                                <a href={`tel:${licitacao.contactoTelefone}`} className="hover:underline">
                                  {licitacao.contactoTelefone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Botões de ação */}
                      <div className="flex gap-2 pt-2">
                        <Link href={`/licitacoes/${licitacao?.id}`}>
                          <Button variant="outline" size="sm" className="border-cyan-300 text-cyan-600 hover:bg-cyan-50">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Detalhes
                          </Button>
                        </Link>
                        {licitacao?.editalUrl && (
                          <a href={licitacao.editalUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                              <Link2 className="w-4 h-4 mr-1" />
                              Acessar Edital
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
