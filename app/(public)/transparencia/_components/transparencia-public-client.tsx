"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  BarChart3,
  Users,
  DollarSign,
  Document,
  AlertCircle,
  ExternalLink,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const documentos = [
  {
    categoria: "Orçamento",
    icone: BarChart3,
    cor: "from-blue-500 to-blue-600",
    items: [
      { title: "Orçamento 2025", descricao: "Planejamento orçamentário anual", data: "Jan 2025" },
      { title: "Orçamento 2024", descricao: "Plano orçamentário exercício anterior", data: "Jan 2024" },
      { title: "Execução Orçamentária", descricao: "Acompanhamento em tempo real", data: "Atualizado" },
    ],
  },
  {
    categoria: "Licitações e Contratos",
    icone: FileText,
    cor: "from-green-500 to-green-600",
    items: [
      { title: "Editais Abertos", descricao: "Licitações em andamento", data: "5 Abertos" },
      { title: "Contratos Vigentes", descricao: "Relação de contratos ativos", data: "Atualizado" },
      { title: "Resultado de Licitações", descricao: "Licitações finalizadas", data: "Histórico" },
    ],
  },
  {
    categoria: "Gestão Pública",
    icone: Users,
    cor: "from-purple-500 to-purple-600",
    items: [
      { title: "Estrutura Organizacional", descricao: "Organograma da administração", data: "Disponível" },
      { title: "Equipe Gestora", descricao: "Dados dos gestores públicos", data: "Atualizado" },
      { title: "Plano Plurianual", descricao: "Plano estratégico municipal", data: "2024-2027" },
    ],
  },
  {
    categoria: "Receitas e Despesas",
    icone: DollarSign,
    cor: "from-orange-500 to-orange-600",
    items: [
      { title: "Arrecadação de Impostos", descricao: "Receita tributária municipal", data: "Mensal" },
      { title: "Despesas Públicas", descricao: "Gastos da administração", data: "Atualizado" },
      { title: "Demonstrativo Financeiro", descricao: "Situação financeira detalhada", data: "Quarterly" },
    ],
  },
];

const infoCards = [
  {
    title: "Informação Pública",
    descricao: "Acesso a todos os dados públicos da administração municipal conforme Lei de Acesso à Informação (Lei 12.527/2011)",
    icone: AlertCircle,
  },
  {
    title: "Solicitações de Informação",
    descricao: "Realize solicitações de informações específicas ao governo municipal",
    icone: Search,
  },
  {
    title: "Consultas e Relatórios",
    descricao: "Acesse consultas interativas e relatórios atualizados em tempo real",
    icone: BarChart3,
  },
];

export default function TransparenciaPublicClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocumentos = documentos.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Portal da <span className="text-blue-200">Transparência</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Acesso a informações públicas da Prefeitura Municipal de Lambari.
            Conheça os dados, orçamentos e gestão municipal.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Info Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {infoCards.map((info, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <info.icone className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{info.descricao}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Pesquisar documentos e informações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </motion.div>

        {/* Documentos por Categoria */}
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredDocumentos.map((categoria) => (
            categoria.items.length > 0 && (
              <motion.div key={categoria.categoria} variants={itemVariants}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-3 bg-gradient-to-br ${categoria.cor} rounded-lg`}
                    >
                      <categoria.icone className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {categoria.categoria}
                    </h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoria.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </CardTitle>
                          <CardDescription>{item.descricao}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-end justify-between">
                          <span className="text-sm text-gray-500">
                            {item.data}
                          </span>
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </motion.div>

        {/* Lei de Acesso à Informação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-blue-50 rounded-xl border border-blue-200"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Lei de Acesso à Informação
              </h3>
              <p className="text-gray-700 mb-4">
                De acordo com a Lei Federal nº 12.527/2011, todo cidadão tem o
                direito de acessar informações públicas. A Prefeitura Municipal de
                Lambari disponibiliza este portal para facilitar o acesso a dados
                da administração pública municipal.
              </p>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() =>
                  window.open(
                    "https://www.gov.br/cidadania/pt-br/acesso-a-informacao",
                    "_blank"
                  )
                }
              >
                <FileText className="w-4 h-4" />
                Lei de Acesso à Informação
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Solicitação de Informação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="text-2xl">
                Não encontrou o que procura?
              </CardTitle>
              <CardDescription className="text-base">
                Solicite informações específicas à Prefeitura Municipal de Lambari
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="w-5 h-5" />
                Solicitar Informação
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
