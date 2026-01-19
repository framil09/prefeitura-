import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, DollarSign, Building2, FileText, Clock, Download, MapPin, Phone, Mail, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTimeUTC } from "@/lib/utils";

export const dynamic = "force-dynamic";

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

export default async function LicitacaoDetailPage({ params }: { params: { id: string } }) {
  const licitacaoRaw = await prisma.licitacao.findUnique({
    where: { id: params.id },
    include: { secretaria: true }
  });

  if (!licitacaoRaw) {
    notFound();
  }

  // Converte Decimal para number
  const licitacao = {
    ...licitacaoRaw,
    valorEstimado: licitacaoRaw.valorEstimado ? Number(licitacaoRaw.valorEstimado) : null
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/licitacoes">
            <Button variant="ghost" className="text-white hover:bg-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Licitações
            </Button>
          </Link>
          <div className="space-y-3">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${statusColors[licitacao.status]}`}>
              {statusLabels[licitacao.status]}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {licitacao.objeto}
            </h1>
            <p className="text-blue-100">Nº {licitacao.numero} • {licitacao.modalidade}</p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Detalhes Principais */}
            <div className="lg:col-span-2 space-y-6">
              {/* Descrição */}
              <Card className="border-cyan-200">
                <CardHeader className="border-b border-cyan-100">
                  <CardTitle className="text-cyan-700">Descrição Completa</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Objeto da Licitação</h3>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {licitacao.objeto}
                      </p>
                    </div>
                    {licitacao.descricaoDetalhada && (
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">Detalhes</h3>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {licitacao.descricaoDetalhada}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Informações Gerais */}
              <Card className="border-cyan-200">
                <CardHeader className="border-b border-cyan-100">
                  <CardTitle className="text-cyan-700">Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-cyan-600 mt-1" />
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase">Data de Abertura</p>
                          <p className="text-gray-800 font-medium">
                            {formatDateTimeUTC(licitacao.dataAbertura)}
                          </p>
                        </div>
                      </div>
                      {licitacao.dataEncerramento && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-cyan-600 mt-1" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Data de Encerramento</p>
                            <p className="text-gray-800 font-medium">
                              {formatDateTimeUTC(licitacao.dataEncerramento)}
                            </p>
                          </div>
                        </div>
                      )}
                      {licitacao.valorEstimado && (
                        <div className="flex items-start gap-3">
                          <DollarSign className="w-5 h-5 text-cyan-600 mt-1" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Valor Estimado</p>
                            <p className="text-gray-800 font-bold text-lg">
                              R$ {licitacao.valorEstimado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {licitacao.secretaria && (
                        <div className="flex items-start gap-3">
                          <Building2 className="w-5 h-5 text-cyan-600 mt-1" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Secretaria Responsável</p>
                            <p className="text-gray-800 font-medium">{licitacao.secretaria.nome}</p>
                          </div>
                        </div>
                      )}
                      {licitacao.local && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-cyan-600 mt-1" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Local</p>
                            <p className="text-gray-800 font-medium">{licitacao.local}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações de Contato */}
              {(licitacao.contactoPessoa || licitacao.contactoEmail || licitacao.contactoTelefone) && (
                <Card className="border-sky-200 bg-sky-50">
                  <CardHeader className="border-b border-sky-200">
                    <CardTitle className="text-sky-700">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {licitacao.contactoPessoa && (
                        <div>
                          <p className="text-xs font-semibold text-sky-700 uppercase mb-1">Responsável</p>
                          <p className="text-sky-900 font-medium">{licitacao.contactoPessoa}</p>
                        </div>
                      )}
                      {licitacao.contactoEmail && (
                        <div>
                          <p className="text-xs font-semibold text-sky-700 uppercase mb-1">E-mail</p>
                          <a
                            href={`mailto:${licitacao.contactoEmail}`}
                            className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium"
                          >
                            <Mail className="w-4 h-4" />
                            {licitacao.contactoEmail}
                          </a>
                        </div>
                      )}
                      {licitacao.contactoTelefone && (
                        <div>
                          <p className="text-xs font-semibold text-sky-700 uppercase mb-1">Telefone</p>
                          <a
                            href={`tel:${licitacao.contactoTelefone}`}
                            className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium"
                          >
                            <Phone className="w-4 h-4" />
                            {licitacao.contactoTelefone}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Barra Lateral */}
            <div className="space-y-6">
              {/* Card de Status */}
              <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50">
                <CardHeader className="border-b border-cyan-200">
                  <CardTitle className="text-cyan-700">Status</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className={`px-4 py-3 rounded-lg text-center font-bold border ${statusColors[licitacao.status]}`}>
                    {statusLabels[licitacao.status]}
                  </div>
                </CardContent>
              </Card>

              {/* Edital */}
              {licitacao.editalUrl && (
                <Card className="border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-cyan-200 rounded-lg">
                        <FileText className="w-8 h-8 text-cyan-700" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-center">Edital Disponível</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      Acesse o documento completo com todas as informações e detalhes da licitação.
                    </p>
                    <a href={licitacao.editalUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                        <Link2 className="w-4 h-4 mr-2" />
                        Abrir Edital
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )}

              {/* Resumo Rápido */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-700">Resumo Rápido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-500 mb-1">Modalidade</p>
                    <p className="font-semibold text-gray-800">{licitacao.modalidade}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500 mb-1">Número da Licitação</p>
                    <p className="font-mono font-bold text-cyan-600">{licitacao.numero}</p>
                  </div>
                  {licitacao.secretaria && (
                    <div className="text-sm">
                      <p className="text-gray-500 mb-1">Sigla da Secretaria</p>
                      <p className="font-semibold text-gray-800">{licitacao.secretaria.sigla ?? licitacao.secretaria.nome}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
