"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, MapPin, User, Calendar, DollarSign, CheckCircle, Download, ExternalLink } from "lucide-react";

interface Emenda {
  id: string;
  numero: string;
  titulo: string;
  descricao?: string;
  autor?: string;
  secretaria?: string;
  valor?: number;
  dataAutoria?: string;
  dataExecucao?: string;
  percentualExecucao?: number;
  documentoUrl?: string;
  ativo: boolean;
}

interface EmendasPublicaClientProps {
  emendas: Emenda[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function EmendasPublicaClient({ emendas }: EmendasPublicaClientProps) {
  const statusColor = (percentual: number = 0) => {
    if (percentual >= 100) return { bg: "bg-green-50", text: "text-green-700", label: "Concluída" };
    if (percentual >= 50) return { bg: "bg-blue-50", text: "text-blue-700", label: "Em Andamento" };
    if (percentual > 0) return { bg: "bg-yellow-50", text: "text-yellow-700", label: "Iniciada" };
    return { bg: "bg-red-50", text: "text-red-700", label: "Não Iniciada" };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Emendas Impositivas</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Acompanhe o status das emendas impositivas destinadas ao município de Lambari
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {/* Emendas Grid */}
      {emendas.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Nenhuma emenda impositiva cadastrada no momento</p>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {emendas.map((emenda) => {
            const status = statusColor(emenda.percentualExecucao);
            return (
              <motion.div key={emenda.id} variants={item}>
                <Card className={`overflow-hidden transition-all hover:shadow-lg ${status.bg}`}>
                  <div className={`h-1 ${status.text.replace("text-", "bg-")}`}></div>
                  <CardContent className="p-6">
                    {/* Número e Status */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-mono bg-gray-200 px-3 py-1 rounded">
                        {emenda.numero}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.text} bg-white`}>
                        {status.label}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                      {emenda.titulo}
                    </h3>

                    {/* Descrição */}
                    {emenda.descricao && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {emenda.descricao}
                      </p>
                    )}

                    {/* Informações */}
                    <div className="space-y-3 mb-4 text-sm">
                      {emenda.autor && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-4 h-4 text-green-600" />
                          <span>{emenda.autor}</span>
                        </div>
                      )}
                      {emenda.secretaria && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span>{emenda.secretaria}</span>
                        </div>
                      )}
                      {emenda.valor && (
                        <div className="flex items-center gap-2 text-gray-700 font-semibold">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span>R$ {parseFloat(emenda.valor.toString()).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      )}
                    </div>

                    {/* Percentual de Execução */}
                    {emenda.percentualExecucao !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-gray-700">Execução</span>
                          <span className={`text-sm font-bold ${status.text}`}>
                            {emenda.percentualExecucao}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${status.text.replace("text-", "bg-")}`}
                            style={{ width: `${Math.min(emenda.percentualExecucao, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Datas */}
                    <div className="flex flex-col gap-2 text-xs text-gray-600 mb-4">
                      {emenda.dataAutoria && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>Autoria: {new Date(emenda.dataAutoria).toLocaleDateString("pt-BR")}</span>
                        </div>
                      )}
                      {emenda.dataExecucao && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          <span>Execução: {new Date(emenda.dataExecucao).toLocaleDateString("pt-BR")}</span>
                        </div>
                      )}
                    </div>

                    {/* Link para documento */}
                    {emenda.documentoUrl && (
                      <a
                        href={emenda.documentoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2 rounded transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Baixar Documento
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
