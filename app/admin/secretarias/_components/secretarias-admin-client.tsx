"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit, Trash2, Building2, User, Phone, Mail, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface SecretariasAdminClientProps {
  secretarias: any[];
}

export function SecretariasAdminClient({ secretarias: initialSecretarias }: SecretariasAdminClientProps) {
  const router = useRouter();
  const [secretarias, setSecretarias] = useState(initialSecretarias ?? []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
    descricao: "",
    secretario: "",
    fotoSecretario: "",
    telefone: "",
    email: "",
    endereco: "",
    ordem: 0,
    ativo: true
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      nome: "",
      sigla: "",
      descricao: "",
      secretario: "",
      fotoSecretario: "",
      telefone: "",
      email: "",
      endereco: "",
      ordem: secretarias.length,
      ativo: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (secretaria: any) => {
    setFormData({
      nome: secretaria.nome ?? "",
      sigla: secretaria.sigla ?? "",
      descricao: secretaria.descricao ?? "",
      secretario: secretaria.secretario ?? "",
      fotoSecretario: secretaria.fotoSecretario ?? "",
      telefone: secretaria.telefone ?? "",
      email: secretaria.email ?? "",
      endereco: secretaria.endereco ?? "",
      ordem: secretaria.ordem ?? 0,
      ativo: secretaria.ativo ?? true
    });
    setEditingId(secretaria.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/secretarias/${editingId}` : "/api/secretarias";
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
    if (!confirm("Tem certeza que deseja excluir esta secretaria?")) return;

    try {
      const res = await fetch(`/api/secretarias/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSecretarias(secretarias.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Secretarias</h1>
          <p className="text-gray-600">Gerencie as secretarias municipais</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Secretaria
        </Button>
      </div>

      {/* Formulário */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar" : "Nova"} Secretaria</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome *</label>
                  <Input
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Nome da Secretaria"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sigla</label>
                  <Input
                    value={formData.sigla}
                    onChange={(e) => setFormData({ ...formData, sigla: e.target.value })}
                    placeholder="SEMAD"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descrição das atribuições..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Secretário(a)</label>
                  <Input
                    value={formData.secretario}
                    onChange={(e) => setFormData({ ...formData, secretario: e.target.value })}
                    placeholder="Nome do(a) secretário(a)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Foto do Secretário (URL)</label>
                  <Input
                    value={formData.fotoSecretario}
                    onChange={(e) => setFormData({ ...formData, fotoSecretario: e.target.value })}
                    placeholder="https://images.pexels.com/photos/1181524/pexels-photo-1181524.jpeg?cs=srgb&dl=pexels-divinetechygirl-1181524.jpg&fm=jpg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <Input
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(35) 3271-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="secretaria@lambari.mg.gov.br"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ordem</label>
                  <Input
                    type="number"
                    value={formData.ordem}
                    onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ativo"
                  checked={formData.ativo}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="ativo" className="text-sm">Ativo</label>
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

      {/* Lista */}
      <div className="space-y-4">
        {secretarias.map((secretaria) => (
          <Card key={secretaria.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-blue-100 overflow-hidden shrink-0">
                  {secretaria.fotoSecretario ? (
                    <Image
                      src={secretaria.fotoSecretario}
                      alt={secretaria.secretario ?? ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">{secretaria.nome}</h3>
                    {secretaria.sigla && (
                      <Badge variant="secondary">{secretaria.sigla}</Badge>
                    )}
                    {!secretaria.ativo && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Secretário(a): {secretaria.secretario ?? "A definir"}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    {secretaria.telefone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {secretaria.telefone}
                      </span>
                    )}
                    {secretaria.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {secretaria.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(secretaria)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(secretaria.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
