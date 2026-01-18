"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit, Trash2, Newspaper, Calendar, Eye, EyeOff, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatDateUTC } from "@/lib/utils";

interface NoticiasAdminClientProps {
  noticias: any[];
  secretarias: any[];
  isAdmin: boolean;
  userSecretariaId?: string;
}

export function NoticiasAdminClient({
  noticias: initialNoticias,
  secretarias,
  isAdmin,
  userSecretariaId
}: NoticiasAdminClientProps) {
  const router = useRouter();
  const [noticias, setNoticias] = useState(initialNoticias ?? []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    resumo: "",
    conteudo: "",
    imagemCapa: "",
    destaque: false,
    publicado: true,
    secretariaId: userSecretariaId ?? ""
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      titulo: "",
      resumo: "",
      conteudo: "",
      imagemCapa: "",
      destaque: false,
      publicado: true,
      secretariaId: userSecretariaId ?? ""
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (noticia: any) => {
    setFormData({
      titulo: noticia.titulo ?? "",
      resumo: noticia.resumo ?? "",
      conteudo: noticia.conteudo ?? "",
      imagemCapa: noticia.imagemCapa ?? "",
      destaque: noticia.destaque ?? false,
      publicado: noticia.publicado ?? true,
      secretariaId: noticia.secretariaId ?? ""
    });
    setEditingId(noticia.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/noticias/${editingId}` : "/api/noticias";
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
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;

    try {
      const res = await fetch(`/api/noticias/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNoticias(noticias.filter(n => n.id !== id));
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notícias</h1>
          <p className="text-gray-600">Gerencie as notícias e informativos</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Notícia
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar" : "Nova"} Notícia</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título *</label>
                <Input
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Título da notícia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resumo</label>
                <Textarea
                  value={formData.resumo}
                  onChange={(e) => setFormData({ ...formData, resumo: e.target.value })}
                  placeholder="Resumo breve da notícia..."
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Conteúdo *</label>
                <Textarea
                  required
                  value={formData.conteudo}
                  onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                  placeholder="Conteúdo completo da notícia..."
                  rows={6}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Imagem de Capa (URL)</label>
                  <Input
                    value={formData.imagemCapa}
                    onChange={(e) => setFormData({ ...formData, imagemCapa: e.target.value })}
                    placeholder="https://i.ytimg.com/vi/HN4rmD-9aYY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBz-DbTKGhl1yxZ4klhSYFDHu_2oQ"
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
                    <option value="">Nenhuma (Geral)</option>
                    {secretarias?.map((s) => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
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
                    checked={formData.publicado}
                    onChange={(e) => setFormData({ ...formData, publicado: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Publicado</span>
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
        {noticias.map((noticia) => (
          <Card key={noticia.id} className="overflow-hidden">
            <div className="relative aspect-video bg-gray-200">
              {noticia.imagemCapa ? (
                <Image
                  src={noticia.imagemCapa}
                  alt={noticia.titulo}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Newspaper className="w-12 h-12 text-gray-300" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {noticia.destaque && (
                  <Badge className="bg-cyan-500"><Star className="w-3 h-3" /></Badge>
                )}
                {!noticia.publicado && (
                  <Badge variant="secondary"><EyeOff className="w-3 h-3" /></Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">{noticia.titulo}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Calendar className="w-3 h-3" />
                {noticia.createdAt && formatDateUTC(noticia.createdAt)}
                {noticia.secretaria && (
                  <Badge variant="outline" className="text-xs">
                    {noticia.secretaria.sigla ?? noticia.secretaria.nome}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(noticia)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(noticia.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
