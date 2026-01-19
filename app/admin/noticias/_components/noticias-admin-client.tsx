"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit, Trash2, Newspaper, Calendar, Eye, EyeOff, Star, Upload, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/image-upload";
import { MediaSelector } from "@/components/media-selector";
import { SocialShare } from "@/components/social-share";
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
    videoUrl: "",
    fotos: [] as string[],
    destaque: false,
    publicado: true,
    dataInicio: "",
    dataFim: "",
    secretariaId: userSecretariaId ?? ""
  });
  const [novaFoto, setNovaFoto] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      titulo: "",
      resumo: "",
      conteudo: "",
      imagemCapa: "",
      videoUrl: "",
      fotos: [],
      destaque: false,
      publicado: true,
      dataInicio: "",
      dataFim: "",
      secretariaId: userSecretariaId ?? ""
    });
    setNovaFoto("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (noticia: any) => {
    setFormData({
      titulo: noticia.titulo ?? "",
      resumo: noticia.resumo ?? "",
      conteudo: noticia.conteudo ?? "",
      imagemCapa: noticia.imagemCapa ?? "",
      videoUrl: noticia.videoUrl ?? "",
      fotos: noticia.fotos ?? [],
      destaque: noticia.destaque ?? false,
      publicado: noticia.publicado ?? true,
      dataInicio: noticia.dataInicio ? noticia.dataInicio.split("T")[0] : "",
      dataFim: noticia.dataFim ? noticia.dataFim.split("T")[0] : "",
      secretariaId: noticia.secretariaId ?? ""
    });
    setNovaFoto("");
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
                  <label className="block text-sm font-medium mb-1">Imagem de Capa</label>
                  <ImageUpload
                    label="Fazer upload da imagem de capa"
                    value={formData.imagemCapa}
                    onChange={(url) => setFormData({ ...formData, imagemCapa: url })}
                    previewWidth={200}
                    previewHeight={120}
                  />
                  <div className="mt-2">
                    <MediaSelector
                      tipo="FOTO"
                      value={formData.imagemCapa}
                      onChange={(url) => setFormData({ ...formData, imagemCapa: url })}
                      label="Ou selecionar da galeria"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL do Vídeo (YouTube/Vimeo)</label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                  <div className="mt-2">
                    <MediaSelector
                      tipo="VIDEO"
                      value={formData.videoUrl}
                      onChange={(url) => setFormData({ ...formData, videoUrl: url })}
                      label="Ou selecionar vídeo da galeria"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Galeria de Fotos</label>
                <div className="space-y-3">
                  {/* Upload de arquivo */}
                  <div className="border-2 border-dashed border-cyan-300 rounded-lg p-4 hover:border-cyan-500 hover:bg-cyan-50 transition">
                    <label className="flex items-center justify-center cursor-pointer">
                      <div className="flex items-center gap-2 text-cyan-600">
                        <Upload className="w-5 h-5" />
                        <span className="text-sm font-medium">Selecionar fotos do seu PC</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={async (e) => {
                          const files = e.currentTarget.files;
                          if (!files) return;

                          for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            if (!file.type.startsWith("image/")) continue;
                            if (file.size > 5 * 1024 * 1024) continue;

                            try {
                              const formData = new FormData();
                              formData.append("file", file);
                              const res = await fetch("/api/upload", {
                                method: "POST",
                                body: formData
                              });
                              if (res.ok) {
                                const data = await res.json();
                                setFormData({
                                  ...formData,
                                  fotos: [...formData.fotos, data.url]
                                });
                              }
                            } catch (error) {
                              console.error("Erro ao upload:", error);
                            }
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* URL alternativa */}
                  <div className="flex gap-2">
                    <Input
                      value={novaFoto}
                      onChange={(e) => setNovaFoto(e.target.value)}
                      placeholder="Ou cole a URL da foto aqui"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (novaFoto.trim()) {
                          setFormData({
                            ...formData,
                            fotos: [...formData.fotos, novaFoto]
                          });
                          setNovaFoto("");
                        }
                      }}
                    >
                      Adicionar
                    </Button>
                  </div>

                  {/* Galeria */}
                  {formData.fotos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {formData.fotos.map((foto, idx) => (
                        <div key={idx} className="relative group">
                          <div className="relative aspect-square bg-gray-200 rounded overflow-hidden">
                            <Image
                              src={foto}
                              alt={`Foto ${idx + 1}`}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                fotos: formData.fotos.filter((_, i) => i !== idx)
                              });
                            }}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Início</label>
                  <Input
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data Final</label>
                  <Input
                    type="date"
                    value={formData.dataFim}
                    onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
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
              <div className="flex flex-col gap-2 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>Publicada: {noticia.createdAt && formatDateUTC(noticia.createdAt)}</span>
                </div>
                {noticia.dataInicio && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Calendar className="w-3 h-3" />
                    <span>Início: {formatDateUTC(noticia.dataInicio)}</span>
                  </div>
                )}
                {noticia.dataFim && (
                  <div className="flex items-center gap-2 text-red-600">
                    <Calendar className="w-3 h-3" />
                    <span>Fim: {formatDateUTC(noticia.dataFim)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                {noticia.secretaria && (
                  <Badge variant="outline" className="text-xs">
                    {noticia.secretaria.sigla ?? noticia.secretaria.nome}
                  </Badge>
                )}
              </div>

              {/* Seção de Compartilhamento em Redes Sociais */}
              {noticia.publicado && (
                <div className="mb-3 pb-3 border-b">
                  <p className="text-xs text-gray-600 font-semibold mb-2">📱 Compartilhar:</p>
                  <SocialShare
                    title={noticia.titulo}
                    url={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/noticias/${noticia.id}`}
                    resumo={noticia.resumo}
                  />
                </div>
              )}

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
