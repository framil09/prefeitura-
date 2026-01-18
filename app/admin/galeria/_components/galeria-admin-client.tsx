"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit, Trash2, Image as ImageIcon, Video, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface GaleriaAdminClientProps {
  midias: any[];
}

export function GaleriaAdminClient({ midias: initialMidias }: GaleriaAdminClientProps) {
  const router = useRouter();
  const [midias, setMidias] = useState(initialMidias ?? []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "FOTO" as "FOTO" | "VIDEO",
    url: "",
    thumbnail: "",
    destaque: false
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      tipo: "FOTO",
      url: "",
      thumbnail: "",
      destaque: false
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (midia: any) => {
    setFormData({
      titulo: midia.titulo ?? "",
      descricao: midia.descricao ?? "",
      tipo: midia.tipo ?? "FOTO",
      url: midia.url ?? "",
      thumbnail: midia.thumbnail ?? "",
      destaque: midia.destaque ?? false
    });
    setEditingId(midia.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/midias/${editingId}` : "/api/midias";
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
    if (!confirm("Tem certeza que deseja excluir esta mídia?")) return;

    try {
      const res = await fetch(`/api/midias/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMidias(midias.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Galeria</h1>
          <p className="text-gray-600">Gerencie fotos e vídeos</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Mídia
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar" : "Nova"} Mídia</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título *</label>
                  <Input
                    required
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Título da mídia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as "FOTO" | "VIDEO" })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="FOTO">Foto</option>
                    <option value="VIDEO">Vídeo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descrição da mídia..."
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">URL *</label>
                  <Input
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder={formData.tipo === "FOTO" ? "URL da imagem" : "URL do vídeo (YouTube embed)"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Thumbnail</label>
                  <Input
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="URL da miniatura"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="destaque"
                  checked={formData.destaque}
                  onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="destaque" className="text-sm">Destaque na galeria</label>
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {midias.map((midia) => (
          <Card key={midia.id} className="overflow-hidden group">
            <div className="relative aspect-square bg-gray-200">
              <Image
                src={midia.thumbnail ?? midia.url ?? ""}
                alt={midia.titulo ?? "Mídia"}
                fill
                className="object-cover"
              />
              {midia.tipo === "VIDEO" && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-600"><Video className="w-3 h-3" /></Badge>
                </div>
              )}
              {midia.destaque && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-cyan-500"><Star className="w-3 h-3" /></Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => handleEdit(midia)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(midia.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm text-gray-800 truncate">{midia.titulo}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
