"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit, Trash2, Award, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/image-upload";

interface GestaoAdminClientProps {
  prefeitos: any[];
  config?: any;
}

export function GestaoAdminClient({ prefeitos: initialPrefeitos, config: initialConfig }: GestaoAdminClientProps) {
  const router = useRouter();
  const [prefeitos, setPrefeitos] = useState(initialPrefeitos ?? []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    partido: "",
    ano_inicio: new Date().getFullYear(),
    ano_fim: null as number | null,
    foto: "",
    descricao: "",
    destaque: false,
    ativo: true,
    ordem: 0
  });
  const [loading, setLoading] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [adminFormData, setAdminFormData] = useState({
    prefeito: initialConfig?.prefeito ?? "",
    fotoPrefeito: initialConfig?.fotoPrefeito ?? "",
    vicePrefeito: initialConfig?.vicePrefeito ?? "",
    fotoVicePrefeito: initialConfig?.fotoVicePrefeito ?? ""
  });
  const [adminLoading, setAdminLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      nome: "",
      partido: "",
      ano_inicio: new Date().getFullYear(),
      ano_fim: null,
      foto: "",
      descricao: "",
      destaque: false,
      ativo: true,
      ordem: 0
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (prefeito: any) => {
    setFormData({
      nome: prefeito.nome ?? "",
      partido: prefeito.partido ?? "",
      ano_inicio: prefeito.ano_inicio ?? new Date().getFullYear(),
      ano_fim: prefeito.ano_fim ?? null,
      foto: prefeito.foto ?? "",
      descricao: prefeito.descricao ?? "",
      destaque: prefeito.destaque ?? false,
      ativo: prefeito.ativo ?? true,
      ordem: prefeito.ordem ?? 0
    });
    setEditingId(prefeito.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/prefeitos/${editingId}` : "/api/prefeitos";
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

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);

    try {
      const res = await fetch("/api/configuracao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminFormData)
      });

      if (res.ok) {
        router.refresh();
        setShowAdminForm(false);
        alert("Administração atualizada com sucesso!");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar administração");
    } finally {
      setAdminLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este prefeito?")) return;

    try {
      const res = await fetch(`/api/prefeitos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPrefeitos(prefeitos.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const sortedPrefeitos = [...prefeitos].sort((a, b) => {
    if (a.ano_fim === null && b.ano_fim === null) return b.ano_inicio - a.ano_inicio;
    if (a.ano_fim === null) return -1;
    if (b.ano_fim === null) return 1;
    return b.ano_fim - a.ano_fim;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão Municipal</h1>
          <p className="text-gray-600">Gerencie os prefeitos e histórico de gestão</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Prefeito
        </Button>
      </div>

      {/* Administração Atual */}
      <Card className="border-t-4 border-t-cyan-500 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Administração Atual (2025-2028)</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowAdminForm(!showAdminForm)}>
            {showAdminForm ? "Cancelar" : "Editar"}
          </Button>
        </CardHeader>
        <CardContent>
          {showAdminForm ? (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Prefeito */}
                <div>
                  <label className="block text-sm font-bold mb-3 text-blue-800">Prefeito Municipal</label>
                  <div className="space-y-2">
                    <select
                      value={adminFormData.prefeito}
                      onChange={(e) => {
                        const prefeito = prefeitos.find(p => p.nome === e.target.value);
                        setAdminFormData({
                          ...adminFormData,
                          prefeito: e.target.value,
                          fotoPrefeito: prefeito?.foto ?? adminFormData.fotoPrefeito
                        });
                      }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Selecione um prefeito</option>
                      {prefeitos.map((p) => (
                        <option key={p.id} value={p.nome}>{p.nome}</option>
                      ))}
                    </select>
                    <Input
                      value={adminFormData.prefeito}
                      onChange={(e) => setAdminFormData({ ...adminFormData, prefeito: e.target.value })}
                      placeholder="Ou digite o nome"
                    />
                    <ImageUpload
                      label="Foto do Prefeito"
                      value={adminFormData.fotoPrefeito}
                      onChange={(url) => setAdminFormData({ ...adminFormData, fotoPrefeito: url })}
                      previewWidth={96}
                      previewHeight={128}
                    />
                  </div>
                </div>

                {/* Vice-Prefeito */}
                <div>
                  <label className="block text-sm font-bold mb-3 text-cyan-800">Vice-Prefeito</label>
                  <div className="space-y-2">
                    <select
                      value={adminFormData.vicePrefeito}
                      onChange={(e) => {
                        const vice = prefeitos.find(p => p.nome === e.target.value);
                        setAdminFormData({
                          ...adminFormData,
                          vicePrefeito: e.target.value,
                          fotoVicePrefeito: vice?.foto ?? adminFormData.fotoVicePrefeito
                        });
                      }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Selecione um vice</option>
                      {prefeitos.map((p) => (
                        <option key={p.id} value={p.nome}>{p.nome}</option>
                      ))}
                    </select>
                    <Input
                      value={adminFormData.vicePrefeito}
                      onChange={(e) => setAdminFormData({ ...adminFormData, vicePrefeito: e.target.value })}
                      placeholder="Ou digite o nome"
                    />
                    <ImageUpload
                      label="Foto do Vice-Prefeito"
                      value={adminFormData.fotoVicePrefeito}
                      onChange={(url) => setAdminFormData({ ...adminFormData, fotoVicePrefeito: url })}
                      previewWidth={96}
                      previewHeight={128}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={adminLoading} className="bg-cyan-600 hover:bg-cyan-700">
                  {adminLoading ? "Salvando..." : "Salvar"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAdminForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Prefeito - Card */}
              <div className="bg-white rounded-lg p-4 shadow border-l-4 border-l-blue-600">
                <div className="text-center">
                  <p className="text-sm font-semibold text-blue-700 mb-2">Prefeito Municipal</p>
                  {adminFormData.fotoPrefeito ? (
                    <div className="relative w-32 h-40 mx-auto rounded-lg overflow-hidden mb-3 shadow-md">
                      <Image
                        src={adminFormData.fotoPrefeito}
                        alt={adminFormData.prefeito}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-32 h-40 mx-auto rounded-lg overflow-hidden mb-3 shadow-md bg-blue-100 flex items-center justify-center">
                      <User className="w-16 h-16 text-blue-300" />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-800">{adminFormData.prefeito || "Não definido"}</h3>
                </div>
              </div>

              {/* Vice-Prefeito - Card */}
              <div className="bg-white rounded-lg p-4 shadow border-l-4 border-l-cyan-600">
                <div className="text-center">
                  <p className="text-sm font-semibold text-cyan-700 mb-2">Vice-Prefeito</p>
                  {adminFormData.fotoVicePrefeito ? (
                    <div className="relative w-32 h-40 mx-auto rounded-lg overflow-hidden mb-3 shadow-md">
                      <Image
                        src={adminFormData.fotoVicePrefeito}
                        alt={adminFormData.vicePrefeito}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-32 h-40 mx-auto rounded-lg overflow-hidden mb-3 shadow-md bg-cyan-100 flex items-center justify-center">
                      <User className="w-16 h-16 text-cyan-300" />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-800">{adminFormData.vicePrefeito || "Não definido"}</h3>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar" : "Novo"} Prefeito</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo *</label>
                <Input
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome do prefeito"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ano de Início *</label>
                  <Input
                    required
                    type="number"
                    value={formData.ano_inicio}
                    onChange={(e) => setFormData({ ...formData, ano_inicio: parseInt(e.target.value) })}
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ano de Término</label>
                  <Input
                    type="number"
                    value={formData.ano_fim ?? ""}
                    onChange={(e) => setFormData({ ...formData, ano_fim: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="2024 (deixe vazio se ainda está no cargo)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Partido Político</label>
                <Input
                  value={formData.partido}
                  onChange={(e) => setFormData({ ...formData, partido: e.target.value })}
                  placeholder="ex: MDB, PSDB, PT, etc"
                />
              </div>

              <div>
                <ImageUpload
                  label="Foto do Prefeito"
                  value={formData.foto}
                  onChange={(url) => setFormData({ ...formData, foto: url })}
                  previewWidth={128}
                  previewHeight={160}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição/Realizações</label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva as principais realizações e informações sobre a gestão..."
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ordem de Exibição</label>
                  <Input
                    type="number"
                    value={formData.ordem}
                    onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.destaque}
                    onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Destaque</span>
                </label>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPrefeitos.map((prefeito) => (
          <Card key={prefeito.id} className="overflow-hidden">
            <div className="relative aspect-video bg-gray-200">
              {prefeito.foto ? (
                <Image
                  src={prefeito.foto}
                  alt={prefeito.nome}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-300" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {prefeito.destaque && (
                  <Badge className="bg-cyan-500"><Award className="w-3 h-3" /></Badge>
                )}
                {!prefeito.ativo && (
                  <Badge variant="secondary">Inativo</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{prefeito.nome}</h3>
              
              <div className="space-y-1 text-xs text-gray-600 mb-3">
                {prefeito.partido && (
                  <p><span className="font-medium">Partido:</span> {prefeito.partido}</p>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {prefeito.ano_inicio}
                    {prefeito.ano_fim ? ` - ${prefeito.ano_fim}` : " - Atual"}
                  </span>
                </div>
              </div>

              {prefeito.descricao && (
                <p className="text-xs text-gray-700 mb-3 line-clamp-2">{prefeito.descricao}</p>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(prefeito)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(prefeito.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {prefeitos.length === 0 && !showForm && (
        <Card>
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">Nenhum prefeito cadastrado</p>
            <p className="text-sm text-gray-500">Clique em "Novo Prefeito" para começar</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
