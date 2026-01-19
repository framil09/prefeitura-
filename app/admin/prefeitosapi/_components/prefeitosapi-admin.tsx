"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Upload, X } from "lucide-react";

interface Prefeito {
  id: string;
  nome: string;
  foto?: string;
  ano_inicio: number;
  ano_fim?: number;
  descricao?: string;
  partido?: string;
  destaque: boolean;
  ativo: boolean;
}

export function PrefeitosAdmin() {
  const [prefeitosApi, setPrefeitosApi] = useState<Prefeito[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<Prefeito>>({
    nome: "",
    foto: "",
    ano_inicio: new Date().getFullYear(),
    ano_fim: undefined,
    descricao: "",
    partido: "",
    destaque: false,
    ativo: true
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchPrefeitosApi();
  }, []);

  const fetchPrefeitosApi = async () => {
    try {
      const response = await fetch("/api/prefeitosapi");
      if (response.ok) {
        const data = await response.json();
        setPrefeitosApi(data);
      }
    } catch (error) {
      console.error("Erro ao buscar prefeitosapi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataImage = new FormData();
    formDataImage.append("file", file);

    try {
      const response = await fetch("/api/midias", {
        method: "POST",
        body: formDataImage
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, foto: data.url });
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.ano_inicio) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    try {
      if (editingId) {
        const response = await fetch(`/api/prefeitosapi/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          fetchPrefeitosApi();
          resetForm();
        }
      } else {
        const response = await fetch("/api/prefeitosapi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          fetchPrefeitosApi();
          resetForm();
        }
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleEdit = (prefeito: Prefeito) => {
    setFormData(prefeito);
    setEditingId(prefeito.id);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este prefeito?")) return;

    try {
      const response = await fetch(`/api/prefeitosapi/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchPrefeitosApi();
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      foto: "",
      ano_inicio: new Date().getFullYear(),
      ano_fim: undefined,
      descricao: "",
      partido: "",
      destaque: false,
      ativo: true
    });
    setEditingId(null);
  };

  const handleOpenDialog = (isNew = true) => {
    if (isNew) resetForm();
    setOpenDialog(true);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Prefeitosapi</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Prefeito
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Prefeito" : "Novo Prefeito"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Foto Preview */}
              {formData.foto && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300">
                  <Image
                    src={formData.foto}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, foto: "" })}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Upload Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm text-gray-500"
                />
                {uploadingImage && <p className="text-sm text-blue-600 mt-1">Enviando...</p>}
              </div>

              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                <Input
                  value={formData.nome || ""}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome do prefeito"
                />
              </div>

              {/* Partido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Partido</label>
                <Input
                  value={formData.partido || ""}
                  onChange={(e) => setFormData({ ...formData, partido: e.target.value })}
                  placeholder="Ex: UNIÃO, MDB, PSDB"
                />
              </div>

              {/* Anos */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ano Início *</label>
                  <Input
                    type="number"
                    value={formData.ano_inicio || ""}
                    onChange={(e) => setFormData({ ...formData, ano_inicio: parseInt(e.target.value) })}
                    placeholder="2021"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ano Fim</label>
                  <Input
                    type="number"
                    value={formData.ano_fim || ""}
                    onChange={(e) => setFormData({ ...formData, ano_fim: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="2024"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <Textarea
                  value={formData.descricao || ""}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Informações adicionais"
                  rows={3}
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.destaque || false}
                    onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Destacar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.ativo ?? true}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Ativo</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Prefeitos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prefeitosApi.map((prefeito, index) => (
          <motion.div
            key={prefeito.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              {prefeito.foto && (
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={prefeito.foto}
                    alt={prefeito.nome}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{prefeito.nome}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {prefeito.ano_fim ? `${prefeito.ano_inicio}-${prefeito.ano_fim}` : prefeito.ano_inicio}
                </p>
                {prefeito.partido && (
                  <p className="text-sm text-blue-600 mb-3">Partido: {prefeito.partido}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(prefeito)}
                    className="flex-1 gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(prefeito.id)}
                    className="flex-1 gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
