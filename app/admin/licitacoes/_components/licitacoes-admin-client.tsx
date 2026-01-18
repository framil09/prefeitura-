"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, FileText, Calendar, DollarSign } from "lucide-react";
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
  const [formData, setFormData] = useState({
    numero: "",
    modalidade: "Pregão Eletrônico",
    objeto: "",
    valorEstimado: "",
    dataAbertura: "",
    dataEncerramento: "",
    status: "ABERTA",
    editalUrl: "",
    secretariaId: userSecretariaId ?? ""
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      numero: "",
      modalidade: "Pregão Eletrônico",
      objeto: "",
      valorEstimado: "",
      dataAbertura: "",
      dataEncerramento: "",
      status: "ABERTA",
      editalUrl: "",
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
      valorEstimado: licitacao.valorEstimado?.toString() ?? "",
      dataAbertura: licitacao.dataAbertura ? new Date(licitacao.dataAbertura).toISOString().slice(0, 16) : "",
      dataEncerramento: licitacao.dataEncerramento ? new Date(licitacao.dataEncerramento).toISOString().slice(0, 16) : "",
      status: licitacao.status ?? "ABERTA",
      editalUrl: licitacao.editalUrl ?? "",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Licitações</h1>
          <p className="text-gray-600">Gerencie os processos licitatórios</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Licitação
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar" : "Nova"} Licitação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Número *</label>
                  <Input
                    required
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    placeholder="001/2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Modalidade *</label>
                  <select
                    required
                    value={formData.modalidade}
                    onChange={(e) => setFormData({ ...formData, modalidade: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="ABERTA">Aberta</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="ENCERRADA">Encerrada</option>
                    <option value="SUSPENSA">Suspensa</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Objeto *</label>
                <Textarea
                  required
                  value={formData.objeto}
                  onChange={(e) => setFormData({ ...formData, objeto: e.target.value })}
                  placeholder="Descrição do objeto da licitação..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Valor Estimado</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.valorEstimado}
                    onChange={(e) => setFormData({ ...formData, valorEstimado: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data Abertura *</label>
                  <Input
                    type="datetime-local"
                    required
                    value={formData.dataAbertura}
                    onChange={(e) => setFormData({ ...formData, dataAbertura: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data Encerramento</label>
                  <Input
                    type="datetime-local"
                    value={formData.dataEncerramento}
                    onChange={(e) => setFormData({ ...formData, dataEncerramento: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Secretaria</label>
                  <select
                    value={formData.secretariaId}
                    onChange={(e) => setFormData({ ...formData, secretariaId: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    disabled={!isAdmin}
                  >
                    <option value="">Selecione...</option>
                    {secretarias?.map((s) => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL do Edital</label>
                <Input
                  value={formData.editalUrl}
                  onChange={(e) => setFormData({ ...formData, editalUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {licitacoes.map((licitacao) => (
          <Card key={licitacao.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={licitacao.status === "ABERTA" ? "success" : "secondary"}>
                      {statusLabels[licitacao.status]}
                    </Badge>
                    <span className="font-mono text-sm text-gray-500">Nº {licitacao.numero}</span>
                    <span className="text-sm text-blue-600">{licitacao.modalidade}</span>
                  </div>
                  <p className="text-gray-800 line-clamp-2">{licitacao.objeto}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {licitacao.dataAbertura && formatDateUTC(licitacao.dataAbertura)}
                    </span>
                    {licitacao.valorEstimado && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        R$ {Number(licitacao.valorEstimado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    )}
                    {licitacao.secretaria && (
                      <Badge variant="outline">{licitacao.secretaria.sigla ?? licitacao.secretaria.nome}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(licitacao)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  {isAdmin && (
                    <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(licitacao.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
