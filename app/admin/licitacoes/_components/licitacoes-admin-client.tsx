"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, FileText, Calendar, DollarSign, X, Link2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatDateUTC } from "@/lib/utils";

interface LicitacoesAdminClientProps {
  licitacoes: any[];
  secretarias: any[];
  isAdmin: boolean;
  userSecretariaId?: string;
}

const statusLabels: Record<string, string> = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em Andamento",
  ENCERRADA: "Encerrada",
  SUSPENSA: "Suspensa",
  CANCELADA: "Cancelada"
};

const statusColors: Record<string, string> = {
  ABERTA: "bg-green-100 text-green-800",
  EM_ANDAMENTO: "bg-blue-100 text-blue-800",
  ENCERRADA: "bg-gray-100 text-gray-800",
  SUSPENSA: "bg-yellow-100 text-yellow-800",
  CANCELADA: "bg-red-100 text-red-800"
};

export function LicitacoesAdminClient({
  licitacoes: initialLicitacoes,
  secretarias,
  isAdmin,
  userSecretariaId
}: LicitacoesAdminClientProps) {
  const router = useRouter();
  const [licitacoes, setLicitacoes] = useState(initialLicitacoes ?? []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [formData, setFormData] = useState({
    numero: "",
    modalidade: "Pregão Eletrônico",
    objeto: "",
    descricaoDetalhada: "",
    valorEstimado: "",
    dataAbertura: "",
    dataEncerramento: "",
    status: "ABERTA",
    editalUrl: "",
    contactoPessoa: "",
    contactoEmail: "",
    contactoTelefone: "",
    local: "Lambari-MG",
    secretariaId: userSecretariaId ?? ""
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      numero: "",
      modalidade: "Pregão Eletrônico",
      objeto: "",
      descricaoDetalhada: "",
      valorEstimado: "",
      dataAbertura: "",
      dataEncerramento: "",
      status: "ABERTA",
      editalUrl: "",
      contactoPessoa: "",
      contactoEmail: "",
      contactoTelefone: "",
      local: "Lambari-MG",
      secretariaId: userSecretariaId ?? ""
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (licitacao: any) => {
    setFormData({
      numero: licitacao.numero ?? "",
      modalidade: licitacao.modalidade ?? "Pregão Eletrônico",
      objeto: licitacao.objeto ?? "",
      descricaoDetalhada: licitacao.descricaoDetalhada ?? "",
      valorEstimado: licitacao.valorEstimado?.toString() ?? "",
      dataAbertura: licitacao.dataAbertura ? new Date(licitacao.dataAbertura).toISOString().slice(0, 16) : "",
      dataEncerramento: licitacao.dataEncerramento ? new Date(licitacao.dataEncerramento).toISOString().slice(0, 16) : "",
      status: licitacao.status ?? "ABERTA",
      editalUrl: licitacao.editalUrl ?? "",
      contactoPessoa: licitacao.contactoPessoa ?? "",
      contactoEmail: licitacao.contactoEmail ?? "",
      contactoTelefone: licitacao.contactoTelefone ?? "",
      local: licitacao.local ?? "",
      secretariaId: licitacao.secretariaId ?? ""
    });
    setEditingId(licitacao.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/licitacoes/${editingId}` : "/api/licitacoes";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.refresh();
        resetForm();
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta licitação?")) return;

    try {
      const res = await fetch(`/api/licitacoes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLicitacoes(licitacoes.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const filteredLicitacoes = licitacoes.filter(l => {
    const matchesSearch = l.numero.includes(searchTerm) || l.objeto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "TODOS" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">Licitações</h1>
          <p className="text-gray-600 mt-1">Gerencie os processos licitatórios do município</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Licitação
        </Button>
      </div>

      {/* Filtros */}
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          placeholder="Buscar por número ou objeto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-cyan-200"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-md border border-cyan-200 bg-white"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="ABERTA">Aberta</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="ENCERRADA">Encerrada</option>
          <option value="SUSPENSA">Suspensa</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
        <div className="text-sm text-gray-600 flex items-center">
          {filteredLicitacoes.length} licitação{filteredLicitacoes.length !== 1 ? 's' : ''} encontrada{filteredLicitacoes.length !== 1 ? 's' : ''}
        </div>
      </div>

      {showForm && (
        <Card className="border-cyan-200 bg-gradient-to-br from-sky-50 to-cyan-50">
          <CardHeader className="border-b border-cyan-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gradient bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                {editingId ? "Editar" : "Nova"} Licitação
              </CardTitle>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-white rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Primeira linha - Dados principais */}
              <div className="grid md:grid-cols-3 gap-4 pb-4 border-b border-cyan-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Número da Licitação *</label>
                  <Input
                    required
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    placeholder="Ex: 001/2025"
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Modalidade *</label>
                  <select
                    required
                    value={formData.modalidade}
                    onChange={(e) => setFormData({ ...formData, modalidade: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-cyan-200 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                  >
                    <option>Pregão Eletrônico</option>
                    <option>Pregão Presencial</option>
                    <option>Tomada de Preços</option>
                    <option>Concorrência Pública</option>
                    <option>Convite</option>
                    <option>Dispensa</option>
                    <option>Inexigibilidade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-cyan-200 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="ABERTA">Aberta</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="ENCERRADA">Encerrada</option>
                    <option value="SUSPENSA">Suspensa</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
              </div>

              {/* Objeto e Descrição */}
              <div className="space-y-4 pb-4 border-b border-cyan-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Objeto da Licitação *</label>
                  <Input
                    required
                    value={formData.objeto}
                    onChange={(e) => setFormData({ ...formData, objeto: e.target.value })}
                    placeholder="Título resumido do objeto"
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição Detalhada</label>
                  <Textarea
                    value={formData.descricaoDetalhada}
                    onChange={(e) => setFormData({ ...formData, descricaoDetalhada: e.target.value })}
                    placeholder="Descreva em detalhes os serviços/produtos envolvidos..."
                    rows={4}
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Datas e Valores */}
              <div className="grid md:grid-cols-4 gap-4 pb-4 border-b border-cyan-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data Abertura *</label>
                  <Input
                    type="datetime-local"
                    required
                    value={formData.dataAbertura}
                    onChange={(e) => setFormData({ ...formData, dataAbertura: e.target.value })}
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data Encerramento</label>
                  <Input
                    type="datetime-local"
                    value={formData.dataEncerramento}
                    onChange={(e) => setFormData({ ...formData, dataEncerramento: e.target.value })}
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Valor Estimado</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">R$</span>
                    <Input
                      type="text"
                      value={formData.valorEstimado ? Number(formData.valorEstimado).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                      onChange={(e) => {
                        // Remove tudo que não é número ou vírgula
                        let value = e.target.value.replace(/\D/g, '');
                        // Se vazio, limpa
                        if (value === '') {
                          setFormData({ ...formData, valorEstimado: '' });
                        } else {
                          // Converte para número (divide por 100 para colocar os centavos)
                          const numValue = (parseInt(value) / 100).toString();
                          setFormData({ ...formData, valorEstimado: numValue });
                        }
                      }}
                      placeholder="0,00"
                      className="pl-10 border-cyan-200 focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Secretaria</label>
                  <select
                    value={formData.secretariaId}
                    onChange={(e) => setFormData({ ...formData, secretariaId: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-cyan-200 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                    disabled={!isAdmin}
                  >
                    <option value="">Selecione...</option>
                    {secretarias?.map((s) => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="grid md:grid-cols-3 gap-4 pb-4 border-b border-cyan-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Responsável</label>
                  <Input
                    value={formData.contactoPessoa}
                    onChange={(e) => setFormData({ ...formData, contactoPessoa: e.target.value })}
                    placeholder="Nome do responsável"
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail de Contato</label>
                  <Input
                    type="email"
                    value={formData.contactoEmail}
                    onChange={(e) => setFormData({ ...formData, contactoEmail: e.target.value })}
                    placeholder="email@example.com"
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <Input
                    value={formData.contactoTelefone}
                    onChange={(e) => setFormData({ ...formData, contactoTelefone: e.target.value })}
                    placeholder="(35) 9999-9999"
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Local e Edital */}
              <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-cyan-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Local</label>
                  <Input
                    value={formData.local}
                    onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                    placeholder="Local da realização"
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL do Edital</label>
                  <Input
                    value={formData.editalUrl}
                    onChange={(e) => setFormData({ ...formData, editalUrl: e.target.value })}
                    placeholder="https://..."
                    className="border-cyan-200 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white"
                >
                  {loading ? "Salvando..." : "Salvar Licitação"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="border-cyan-200 hover:bg-cyan-50"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Licitações */}
      <div className="space-y-4">
        {filteredLicitacoes.length === 0 ? (
          <Card className="border-dashed border-cyan-300">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhuma licitação encontrada</p>
            </CardContent>
          </Card>
        ) : (
          filteredLicitacoes.map((licitacao) => (
            <Card key={licitacao.id} className="hover:shadow-lg transition border-cyan-100">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${statusColors[licitacao.status]} border-0`}>
                          {statusLabels[licitacao.status]}
                        </Badge>
                        <span className="font-mono text-sm font-semibold text-sky-600">Nº {licitacao.numero}</span>
                        <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded">{licitacao.modalidade}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{licitacao.objeto}</h3>
                      {licitacao.descricaoDetalhada && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{licitacao.descricaoDetalhada}</p>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-cyan-500" />
                          <span>Abertura: <strong>{licitacao.dataAbertura && formatDateUTC(licitacao.dataAbertura)}</strong></span>
                        </div>
                        {licitacao.dataEncerramento && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-cyan-500" />
                            <span>Encerramento: <strong>{formatDateUTC(licitacao.dataEncerramento)}</strong></span>
                          </div>
                        )}
                        {licitacao.valorEstimado && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4 text-cyan-500" />
                            <span>R$ <strong>{Number(licitacao.valorEstimado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong></span>
                          </div>
                        )}
                        {licitacao.local && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-cyan-500" />
                            <span><strong>{licitacao.local}</strong></span>
                          </div>
                        )}
                        {licitacao.secretaria && (
                          <Badge variant="outline" className="w-fit">{licitacao.secretaria.sigla ?? licitacao.secretaria.nome}</Badge>
                        )}
                      </div>

                      {(licitacao.contactoPessoa || licitacao.contactoEmail || licitacao.contactoTelefone) && (
                        <div className="mt-3 p-3 bg-sky-50 rounded-lg text-sm">
                          <p className="font-semibold text-sky-900 mb-1">Contato:</p>
                          {licitacao.contactoPessoa && <p className="text-sky-800">{licitacao.contactoPessoa}</p>}
                          {licitacao.contactoEmail && <p className="text-sky-800">{licitacao.contactoEmail}</p>}
                          {licitacao.contactoTelefone && <p className="text-sky-800">{licitacao.contactoTelefone}</p>}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(licitacao)}
                        className="border-cyan-200 hover:bg-cyan-50 text-cyan-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {licitacao.editalUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(licitacao.editalUrl)}
                          className="border-cyan-200 hover:bg-cyan-50 text-cyan-600"
                        >
                          <Link2 className="w-4 h-4" />
                        </Button>
                      )}
                      {isAdmin && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-200 hover:bg-red-50 text-red-600"
                          onClick={() => handleDelete(licitacao.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
