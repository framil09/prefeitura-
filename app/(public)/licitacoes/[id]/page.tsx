import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, DollarSign, Building2, FileText, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTimeUTC } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/licitacoes">
            <Button variant="ghost" className="text-white hover:bg-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Licitações
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={statusColors[licitacao.status] as any} className="text-sm">
              {statusLabels[licitacao.status]}
            </Badge>
            <span className="text-blue-200 font-mono">Nº {licitacao.numero}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {licitacao.modalidade}
          </h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Detalhes Principais */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Objeto da Licitação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{licitacao.objeto}</p>
                </CardContent>
              </Card>
            </div>

            {/* Informações Laterais */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Data de Abertura</p>
                      <p className="font-medium">
                        {formatDateTimeUTC(licitacao.dataAbertura)}
                      </p>
                    </div>
                  </div>
                  {licitacao.dataEncerramento && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-xs text-gray-500">Encerramento</p>
                        <p className="font-medium">
                          {formatDateTimeUTC(licitacao.dataEncerramento)}
                        </p>
                      </div>
                    </div>
                  )}
                  {licitacao.valorEstimado && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Valor Estimado</p>
                        <p className="font-medium">
                          R$ {licitacao.valorEstimado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  )}
                  {licitacao.secretaria && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Secretaria</p>
                        <p className="font-medium">{licitacao.secretaria.nome}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {licitacao.editalUrl && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <FileText className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Edital Disponível</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Baixe o edital completo com todas as informações da licitação.
                    </p>
                    <a href={licitacao.editalUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar Edital
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
