"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, AlertCircle, Download, Calendar, FileText } from "lucide-react";
import { DocumentUpload } from "@/components/document-upload";
import { useToast } from "@/components/ui/use-toast";

interface Edital {
  id: string;
  numero: string;
  titulo: string;
  descricao?: string;
  tipo?: string;
  dataAbertura?: string;
  dataEncerramento?: string;
  documentoUrl?: string;
  resultadoUrl?: string;
  conteudo?: string;
  ativo: boolean;
  destaque: boolean;
}

interface EditalAdminClientProps {
  initialEditais: any[];
}

export function EditalAdminClient({
  initialEditais,
}: EditalAdminClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [editais, setEditais] = useState<Edital[]>(initialEditais);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    numero: "",
    titulo: "",
    descricao: "",
    tipo: "Edital",
    dataAbertura: "",
    dataEncerramento: "",
    documentoUrl: "",
    resultadoUrl: "",
    conteudo: "",
    ativo: true,
    destaque: false,
  });

  const resetForm = () => {
    setFormData({
      numero: "",
      titulo: "",
      descricao: "",
      tipo: "Edital",
      dataAbertura: "",
      dataEncerramento: "",
      documentoUrl: "",
      resultadoUrl: "",
      conteudo: "",
      ativo: true,
      destaque: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (edital: Edital) => {
    setFormData({
      numero: edital.numero,
      titulo: edital.titulo,
      descricao: edital.descricao || "",
      tipo: edital.tipo || "Edital",
      dataAbertura: edital.dataAbertura?.split("T")[0] || "",
      dataEncerramento: edital.dataEncerramento?.split("T")[0] || "",
      documentoUrl: edital.documentoUrl || "",
      resultadoUrl: edital.resultadoUrl || "",
      conteudo: edital.conteudo || "",
      ativo: edital.ativo,
      destaque: edital.destaque,
    });
    setEditingId(edital.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/editais/${editingId}` : "/api/editais";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erro ao salvar edital");
      }

      toast({
        title: "✓ Sucesso!",
        description: editingId ? "Edital atualizado com sucesso!" : "Edital criado com sucesso!",
        variant: "default",
        className: "bg-green-500 text-white border-green-600",
        duration: 3000,
      });

      router.refresh();
      resetForm();
    } catch (error: any) {
      toast({
        title: "❌ Erro",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este edital?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/editais/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Erro ao deletar");

      setEditais(editais.filter((e) => e.id !== id));
      toast({
        title: "✓ Deletado",
        description: "Edital removido com sucesso!",
        variant: "default",
        className: "bg-green-500 text-white border-green-600",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "❌ Erro",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Editais e Chamadas Públicas ({editais.length})</CardTitle>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Edital
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
                  <label className="block text-sm font-medium mb-1">Tipo *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Edital">Edital</option>
                    <option value="Chamada Pública">Chamada Pública</option>
                    <option value="Aviso de Licitação">Aviso de Licitação</option>
                    <option value="Pregão">Pregão</option>
                    <option value="Concorrência">Concorrência</option>
                    <option value="Tomada de Preço">Tomada de Preço</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Título *</label>
                <Input
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Título do edital"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descrição breve..."
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Conteúdo/Detalhes</label>
                <Textarea
                  value={formData.conteudo}
                  onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                  placeholder="Conteúdo completo do edital..."
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Abertura</label>
                  <Input
                    type="date"
                    value={formData.dataAbertura}
                    onChange={(e) => setFormData({ ...formData, dataAbertura: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Encerramento</label>
                  <Input
                    type="date"
                    value={formData.dataEncerramento}
                    onChange={(e) => setFormData({ ...formData, dataEncerramento: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <DocumentUpload
                  value={formData.documentoUrl}
                  onChange={(url) => setFormData({ ...formData, documentoUrl: url })}
                  label="Documento do Edital (PDF, DOCX, etc)"
                  acceptedFormats=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.zip,.odt,.rtf"
                  maxSizeMB={10}
                />
              </div>

              <div>
                <DocumentUpload
                  value={formData.resultadoUrl}
                  onChange={(url) => setFormData({ ...formData, resultadoUrl: url })}
                  label="Documento de Resultado (Opcional)"
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
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.destaque}
                    onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Destaque</span>
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
            {editais.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum edital cadastrado</p>
              </div>
            ) : (
              editais.map((edital) => (
                <div key={edital.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
                          {edital.numero}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">
                          {edital.tipo}
                        </span>
                        <h3 className="font-bold text-gray-800">{edital.titulo}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            edital.ativo
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {edital.ativo ? "Ativo" : "Inativo"}
                        </span>
                        {edital.destaque && (
                          <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-semibold">
                            ⭐ Destaque
                          </span>
                        )}
                      </div>
                      {edital.descricao && (
                        <p className="text-sm text-gray-600 mb-2">{edital.descricao}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                        {edital.dataAbertura && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Abertura: {new Date(edital.dataAbertura).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                        {edital.dataEncerramento && (
                          <span className="flex items-center gap-1 font-semibold text-red-600">
                            <Calendar className="w-3 h-3" />
                            Encerramento: {new Date(edital.dataEncerramento).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {edital.documentoUrl && (
                          <a
                            href={edital.documentoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline px-2 py-1 bg-blue-50 rounded"
                          >
                            <Download className="w-3 h-3" />
                            Edital
                          </a>
                        )}
                        {edital.resultadoUrl && (
                          <a
                            href={edital.resultadoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-green-600 hover:underline px-2 py-1 bg-green-50 rounded"
                          >
                            <FileText className="w-3 h-3" />
                            Resultado
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(edital)}
                        disabled={loading}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(edital.id)}
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
