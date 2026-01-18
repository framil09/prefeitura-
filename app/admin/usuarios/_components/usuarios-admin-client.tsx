"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, User, Mail, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface UsuariosAdminClientProps {
  usuarios: any[];
  secretarias: any[];
}

const roleLabels: Record<string, string> = {
  ADMIN: "Administrador",
  SECRETARIO: "Secretário",
  EDITOR: "Editor"
};

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-500",
  SECRETARIO: "bg-blue-500",
  EDITOR: "bg-blue-500"
};

export function UsuariosAdminClient({ usuarios: initialUsuarios, secretarias }: UsuariosAdminClientProps) {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState(initialUsuarios ?? []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "EDITOR",
    secretariaId: ""
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      role: "EDITOR",
      secretariaId: ""
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (usuario: any) => {
    setFormData({
      email: usuario.email ?? "",
      password: "",
      name: usuario.name ?? "",
      role: usuario.role ?? "EDITOR",
      secretariaId: usuario.secretariaId ?? ""
    });
    setEditingId(usuario.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/users/${editingId}` : "/api/users";
      const method = editingId ? "PUT" : "POST";

      const payload = editingId && !formData.password
        ? { ...formData, password: undefined }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.refresh();
        resetForm();
        window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error ?? "Erro ao salvar");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsuarios(usuarios.filter(u => u.id !== id));
      } else {
        const data = await res.json();
        alert(data.error ?? "Erro ao excluir");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
          <p className="text-gray-600">Gerencie os usuários do sistema</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar" : "Novo"} Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Senha {editingId ? "(deixe vazio para manter)" : "*"}
                  </label>
                  <Input
                    type="password"
                    required={!editingId}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="********"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Função *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="ADMIN">Administrador</option>
                    <option value="SECRETARIO">Secretário</option>
                    <option value="EDITOR">Editor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Secretaria</label>
                  <select
                    value={formData.secretariaId}
                    onChange={(e) => setFormData({ ...formData, secretariaId: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Nenhuma</option>
                    {secretarias?.map((s) => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
                </div>
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
        {usuarios.map((usuario) => (
          <Card key={usuario.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">{usuario.name}</h3>
                    <Badge className={roleColors[usuario.role]}>
                      {roleLabels[usuario.role]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {usuario.email}
                    </span>
                    {usuario.secretaria && (
                      <Badge variant="outline">{usuario.secretaria.nome}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(usuario)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(usuario.id)}>
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
