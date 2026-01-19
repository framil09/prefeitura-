"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DocumentUpload } from "@/components/document-upload";
import { Plus, Edit2, Trash2, AlertCircle, Download } from "lucide-react";

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

interface EmendaImpositivaAdminClientProps {
  initialEmendas: any[];
}

export function EmendaImpositivaAdminClient({
  initialEmendas,
}: EmendaImpositivaAdminClientProps) {
  const router = useRouter();
  const [emendas, setEmendas] = useState<Emenda[]>(initialEmendas);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    numero: "",
    titulo: "",
    descricao: "",
    autor: "",
    secretaria: "",
    valor: "",
    dataAutoria: "",
    dataExecucao: "",
    percentualExecucao: "0",
    documentoUrl: "",
    ativo: true,
  });

  const resetForm = () => {
    setFormData({
      numero: "",
      titulo: "",
      descricao: "",
      autor: "",
      secretaria: "",
      valor: "",
      dataAutoria: "",
      dataExecucao: "",
      percentualExecucao: "0",
      documentoUrl: "",
      ativo: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (emenda: Emenda) => {
    setFormData({
      numero: emenda.numero,
      titulo: emenda.titulo,
      descricao: emenda.descricao || "",
      autor: emenda.autor || "",
      secretaria: emenda.secretaria || "",
      valor: emenda.valor?.toString() || "",
      dataAutoria: emenda.dataAutoria?.split("T")[0] || "",
      dataExecucao: emenda.dataExecucao?.split("T")[0] || "",
      percentualExecucao: emenda.percentualExecucao?.toString() || "0",
      documentoUrl: emenda.documentoUrl || "",
      ativo: emenda.ativo,
    });
    setEditingId(emenda.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/emendas-impositivas/${editingId}` : "/api/emendas-impositivas";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          valor: formData.valor ? parseFloat(formData.valor) : null,
          percentualExecucao: parseInt(formData.percentualExecucao),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erro ao salvar emenda");
      }

      router.refresh();
      resetForm();
      alert(editingId ? "Emenda atualizada com sucesso!" : "Emenda criada com sucesso!");
    } catch (error: any) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta emenda?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/emendas-impositivas/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Erro ao deletar");

      setEmendas(emendas.filter((e) => e.id !== id));
      alert("Emenda deletada com sucesso!");
    } catch (error: any) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (percentual: number) => {
    if (percentual >= 100) return "text-green-600 bg-green-50";
    if (percentual >= 50) return "text-blue-600 bg-blue-50";
    if (percentual > 0) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Emendas Impositivas ({emendas.length})</CardTitle>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Emenda
          </Button>
        </CardHeader>
        <CardContent>
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Número *</label>
                  <Input
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    placeholder="ex: 001/2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Título *</label>
                  <Input
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Título da emenda"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva a emenda impositiva..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Autor</label>
                  <Input
                    value={formData.autor}
                    onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                    placeholder="Nome do autor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Secretaria</label>
                  <Input
                    value={formData.secretaria}
                    onChange={(e) => setFormData({ ...formData, secretaria: e.target.value })}
                    placeholder="Secretaria responsável"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Percentual Executado (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.percentualExecucao}
                    onChange={(e) => setFormData({ ...formData, percentualExecucao: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Autoria</label>
                  <Input
                    type="date"
                    value={formData.dataAutoria}
                    onChange={(e) => setFormData({ ...formData, dataAutoria: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Execução</label>
                  <Input
                    type="date"
                    value={formData.dataExecucao}
                    onChange={(e) => setFormData({ ...formData, dataExecucao: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL do Documento</label>
                <Input
                  type="url"
                  value={formData.documentoUrl}
                  onChange={(e) => setFormData({ ...formData, documentoUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div>
                <DocumentUpload
                  value={formData.documentoUrl}
                  onChange={(url) => setFormData({ ...formData, documentoUrl: url })}
                  label="Ou Enviar Documento (PDF, DOCX, etc)"
                  acceptedFormats=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.zip,.odt,.rtf"
                  maxSizeMB={10}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.ativo}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Ativo</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                  {loading ? "Salvando..." : editingId ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          ) : null}

          <div className="grid gap-4">
            {emendas.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma emenda impositiva cadastrada</p>
              </div>
            ) : (
              emendas.map((emenda) => (
                <div key={emenda.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
                          {emenda.numero}
                        </span>
                        <h3 className="font-bold text-gray-800">{emenda.titulo}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            emenda.ativo
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {emenda.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                      {emenda.descricao && (
                        <p className="text-sm text-gray-600 mb-2">{emenda.descricao}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                        {emenda.autor && <span>👤 {emenda.autor}</span>}
                        {emenda.secretaria && <span>🏢 {emenda.secretaria}</span>}
                        {emenda.valor && (
                          <span className="font-semibold">
                            R$ {parseFloat(emenda.valor.toString()).toLocaleString("pt-BR")}
                          </span>
                        )}
                        {emenda.percentualExecucao !== undefined && (
                          <span className={`font-semibold ${statusColor(emenda.percentualExecucao || 0)}`}>
                            {emenda.percentualExecucao}% Executada
                          </span>
                        )}
                      </div>
                      {emenda.documentoUrl && (
                        <a
                          href={emenda.documentoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2 px-2 py-1 bg-blue-50 rounded"
                        >
                          <Download className="w-3 h-3" />
                          Baixar Documento
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(emenda)}
                        disabled={loading}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(emenda.id)}
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
