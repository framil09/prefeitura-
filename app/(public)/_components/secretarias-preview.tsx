"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SecretariasPreviewProps {
  secretarias: any[];
}

export function SecretariasPreview({ secretarias }: SecretariasPreviewProps) {
  const safeSecretarias = secretarias ?? [];

  // Array de cores para os cards - sistema que se repete infinitamente para novas secretarias
  const colors = [
    { bg: "from-blue-50 to-blue-100", icon: "bg-blue-500", border: "border-l-blue-500", text: "text-blue-700" },
    { bg: "from-purple-50 to-purple-100", icon: "bg-purple-500", border: "border-l-purple-500", text: "text-purple-700" },
    { bg: "from-green-50 to-green-100", icon: "bg-green-500", border: "border-l-green-500", text: "text-green-700" },
    { bg: "from-amber-50 to-amber-100", icon: "bg-amber-500", border: "border-l-amber-500", text: "text-amber-700" },
    { bg: "from-red-50 to-red-100", icon: "bg-red-500", border: "border-l-red-500", text: "text-red-700" },
    { bg: "from-cyan-50 to-cyan-100", icon: "bg-cyan-500", border: "border-l-cyan-500", text: "text-cyan-700" },
    { bg: "from-pink-50 to-pink-100", icon: "bg-pink-500", border: "border-l-pink-500", text: "text-pink-700" },
    { bg: "from-indigo-50 to-indigo-100", icon: "bg-indigo-500", border: "border-l-indigo-500", text: "text-indigo-700" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              🏛️ Secretarias Municipais
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Conheça <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Nossas Secretarias</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Conheça os órgãos e departamentos responsáveis pela administração municipal de Lambari
          </p>
          <Link href="/secretarias">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold shadow-lg hover:shadow-xl transition-all">
              Ver todas as secretarias
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Grid de Secretarias - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {safeSecretarias.slice(0, 6).map((secretaria, index) => {
            const colorScheme = colors[index % colors.length];
            return (
              <motion.div
                key={secretaria?.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/secretarias#${secretaria?.sigla?.toLowerCase() ?? ''}`}>
                  <Card className={`h-full hover:shadow-2xl transition-all duration-300 border-l-4 ${colorScheme.border} group bg-gradient-to-br ${colorScheme.bg} overflow-hidden cursor-pointer relative`}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <CardContent className="p-5 md:p-6 flex flex-col h-full relative z-10">
                      {/* Ícone e Badge */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <motion.div 
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className={`w-14 h-14 ${colorScheme.icon} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}
                        >
                          <Building2 className="w-7 h-7 text-white" />
                        </motion.div>
                        {secretaria?.sigla && (
                          <span className="text-xs font-bold bg-white px-3 py-1 rounded-full text-gray-700 shadow-md whitespace-nowrap">
                            {secretaria.sigla}
                          </span>
                        )}
                      </div>
                      
                      {/* Título */}
                      <h3 className={`font-bold text-lg text-gray-900 mb-2 group-hover:${colorScheme.text} transition-colors line-clamp-2`}>
                        {secretaria?.nome ?? "Secretaria"}
                      </h3>
                      
                      {/* Descrição */}
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2 flex-grow">
                        {secretaria?.descricao ?? ""}
                      </p>

                      {/* Contato - Separador e Informações */}
                      {(secretaria?.telefone || secretaria?.email) && (
                        <div className="space-y-2 pt-4 border-t border-gray-300/30 mt-auto">
                          {secretaria?.telefone && (
                            <motion.div 
                              whileHover={{ x: 4 }}
                              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                            >
                              <Phone className="w-4 h-4 shrink-0" />
                              <span className="font-semibold truncate">{secretaria.telefone}</span>
                            </motion.div>
                          )}
                          {secretaria?.email && (
                            <motion.div 
                              whileHover={{ x: 4 }}
                              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                            >
                              <Mail className="w-4 h-4 shrink-0" />
                              <span className="font-semibold truncate">{secretaria.email}</span>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mensagem quando não há secretarias */}
        {safeSecretarias.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma secretaria disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}
