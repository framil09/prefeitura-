"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Loader2,
  Eye,
  EyeOff,
  Mountain,
  Droplets,
  Landmark,
  Waves,
  TreePine,
  MapPin,
} from "lucide-react";
import Image from "next/image";

interface AtrativoTuristico {
  id: string;
  nome: string;
  descricao?: string;
  imagem?: string;
  categoria: string;
  ordem: number;
  ativo: boolean;
  createdAt: string;
}

interface FonteMuneral {
  id: string;
  nome: string;
  descricao?: string;
  propriedades?: string;
  ordem: number;
  ativo: boolean;
  createdAt: string;
}

const CATEGORIAS_ATRATIVO = [
  { value: "parque", label: "Parque", icon: Mountain, color: "bg-green-100 text-green-700 border-green-300" },
  { value: "cassino", label: "Cassino", icon: Landmark, color: "bg-purple-100 text-purple-700 border-purple-300" },
  { value: "lago", label: "Lago", icon: Waves, color: "bg-blue-100 text-blue-700 border-blue-300" },
  { value: "floresta", label: "Floresta", icon: TreePine, color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
  { value: "outro", label: "Outro", icon: MapPin, color: "bg-orange-100 text-orange-700 border-orange-300" },
];

export default function TurismoAdminClient({
  initialAtrativos,
  initialFontes,
}: {
  initialAtrativos: AtrativoTuristico[];
  initialFontes: FonteMuneral[];
}) {
  const { toast } = useToast();
  const [atrativos, setAtrativos] = useState<AtrativoTuristico[]>(
    initialAtrativos
  );
  const [fontes, setFontes] = useState<FonteMuneral[]>(initialFontes);
  const [activeTab, setActiveTab] = useState("atrativos");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"atrativo" | "fonte">("atrativo");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [atrativoForm, setAtrativoForm] = useState({
    nome: "",
    descricao: "",
    imagem: "",
    categoria: "parque",
    ordem: 0,
    ativo: true,
  });

  const [fonteForm, setFonteForm] = useState({
    nome: "",
    descricao: "",
    propriedades: "",
    ordem: 0,
    ativo: true,
  });

  const resetAtrativoForm = () => {
    setAtrativoForm({
      nome: "",
      descricao: "",
      imagem: "",
      categoria: "parque",
      ordem: 0,
      ativo: true,
    });
    setEditingId(null);
  };

  const resetFonteForm = () => {
    setFonteForm({
      nome: "",
      descricao: "",
      propriedades: "",
      ordem: 0,
      ativo: true,
    });
    setEditingId(null);
  };

  const openAtrativoDialog = (atrativo?: AtrativoTuristico) => {
    if (atrativo) {
      setAtrativoForm(atrativo);
      setEditingId(atrativo.id);
    } else {
      resetAtrativoForm();
    }
    setActiveTab("atrativos");
    setIsOpen(true);
  };

  const openFonteDialog = (fonte?: FonteMuneral) => {
    if (fonte) {
      setFonteForm(fonte);
      setEditingId(fonte.id);
    } else {
      resetFonteForm();
    }
    setActiveTab("fontes");
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    resetAtrativoForm();
    resetFonteForm();
  };

  const handleUploadImagem = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "foto");

      const response = await fetch("/api/turismo/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao fazer upload");
      }

      const { url } = await response.json();

      if (activeTab === "atrativos") {
        setAtrativoForm((prev) => ({ ...prev, imagem: url }));
      }

      toast({
        title: "Sucesso",
        description: "Imagem enviada com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const saveAtrativo = async () => {
    if (!atrativoForm.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/turismo/atrativos/${editingId}`
        : "/api/turismo/atrativos";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atrativoForm),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar");
      }

      const savedAtrativo = await response.json();

      if (editingId) {
        setAtrativos((prev) =>
          prev.map((a) => (a.id === editingId ? savedAtrativo : a))
        );
        toast({
          title: "Sucesso",
          description: "Atrativo atualizado com sucesso",
        });
      } else {
        setAtrativos((prev) => [...prev, savedAtrativo]);
        toast({
          title: "Sucesso",
          description: "Atrativo criado com sucesso",
        });
      }

      closeDialog();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveFonte = async () => {
    if (!fonteForm.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/turismo/fontes/${editingId}`
        : "/api/turismo/fontes";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fonteForm),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar");
      }

      const savedFonte = await response.json();

      if (editingId) {
        setFontes((prev) =>
          prev.map((f) => (f.id === editingId ? savedFonte : f))
        );
        toast({
          title: "Sucesso",
          description: "Fonte atualizada com sucesso",
        });
      } else {
        setFontes((prev) => [...prev, savedFonte]);
        toast({
          title: "Sucesso",
          description: "Fonte criada com sucesso",
        });
      }

      closeDialog();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      const url = deleteType === "atrativo"
        ? `/api/turismo/atrativos/${deleteId}`
        : `/api/turismo/fontes/${deleteId}`;

      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Erro ao deletar");
      }

      if (deleteType === "atrativo") {
        setAtrativos((prev) => prev.filter((a) => a.id !== deleteId));
      } else {
        setFontes((prev) => prev.filter((f) => f.id !== deleteId));
      }

      toast({
        title: "Sucesso",
        description: "Item deletado com sucesso",
      });
      setDeleteId(null);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAtivo = async (
    id: string,
    ativo: boolean,
    type: "atrativo" | "fonte"
  ) => {
    try {
      const url = type === "atrativo"
        ? `/api/turismo/atrativos/${id}`
        : `/api/turismo/fontes/${id}`;

      const data = type === "atrativo"
        ? atrativos.find((a) => a.id === id)!
        : fontes.find((f) => f.id === id)!;

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ativo: !ativo }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      if (type === "atrativo") {
        setAtrativos((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ativo: !ativo } : a))
        );
      } else {
        setFontes((prev) =>
          prev.map((f) => (f.id === id ? { ...f, ativo: !ativo } : f))
        );
      }

      toast({
        title: "Sucesso",
        description: `Item ${!ativo ? "ativado" : "desativado"}`,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Turismo</h2>
        <p className="text-muted-foreground mt-1">
          Gerenciar atrativos turísticos e fontes minerais
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="atrativos" className="gap-2">
            <Mountain className="w-4 h-4" />
            Atrativos Turísticos
          </TabsTrigger>
          <TabsTrigger value="fontes" className="gap-2">
            <Droplets className="w-4 h-4" />
            Fontes Minerais
          </TabsTrigger>
        </TabsList>

        {/* Atrativos */}
        <TabsContent value="atrativos" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => openAtrativoDialog()}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Atrativo
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-center">Imagem</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atrativos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Nenhum atrativo cadastrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      atrativos.map((atrativo) => {
                        const categoria = CATEGORIAS_ATRATIVO.find(
                          (c) => c.value === atrativo.categoria
                        );
                        const IconComponent = categoria?.icon || MapPin;
                        return (
                          <TableRow key={atrativo.id}>
                            <TableCell className="font-medium">
                              {atrativo.nome}
                            </TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${categoria?.color}`}>
                                <IconComponent className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {categoria?.label || atrativo.categoria}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              {atrativo.imagem ? (
                                <span className="text-green-600 text-sm">✓</span>
                              ) : (
                                <span className="text-gray-400 text-sm">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  toggleAtivo(atrativo.id, atrativo.ativo, "atrativo")
                                }
                                className="gap-1"
                              >
                                {atrativo.ativo ? (
                                  <>
                                    <Eye className="w-4 h-4" />
                                    Ativo
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-4 h-4" />
                                    Inativo
                                  </>
                                )}
                              </Button>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openAtrativoDialog(atrativo)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setDeleteId(atrativo.id);
                                  setDeleteType("atrativo");
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fontes */}
        <TabsContent value="fontes" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => openFonteDialog()}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Nova Fonte
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Propriedades</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fontes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          Nenhuma fonte cadastrada
                        </TableCell>
                      </TableRow>
                    ) : (
                      fontes.map((fonte) => (
                        <TableRow key={fonte.id}>
                          <TableCell className="font-medium">
                            {fonte.nome}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                            {fonte.propriedades || "—"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                toggleAtivo(fonte.id, fonte.ativo, "fonte")
                              }
                              className="gap-1"
                            >
                              {fonte.ativo ? (
                                <>
                                  <Eye className="w-4 h-4" />
                                  Ativo
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-4 h-4" />
                                  Inativo
                                </>
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openFonteDialog(fonte)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDeleteId(fonte.id);
                                setDeleteType("fonte");
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {activeTab === "atrativos"
                ? editingId
                  ? "Editar Atrativo"
                  : "Novo Atrativo Turístico"
                : editingId
                ? "Editar Fonte"
                : "Nova Fonte Mineral"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para {editingId ? "atualizar" : "criar"} um novo{" "}
              {activeTab === "atrativos" ? "atrativo turístico" : "fonte mineral"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {activeTab === "atrativos" ? (
              <>
                <div>
                  <label className="text-sm font-medium">Nome *</label>
                  <Input
                    value={atrativoForm.nome}
                    onChange={(e) =>
                      setAtrativoForm((prev) => ({
                        ...prev,
                        nome: e.target.value,
                      }))
                    }
                    placeholder="Ex: Parque das Águas"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    value={atrativoForm.descricao}
                    onChange={(e) =>
                      setAtrativoForm((prev) => ({
                        ...prev,
                        descricao: e.target.value,
                      }))
                    }
                    placeholder="Descrição do atrativo"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">Categoria</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {CATEGORIAS_ATRATIVO.map((cat) => {
                      const IconComponent = cat.icon;
                      return (
                        <button
                          key={cat.value}
                          onClick={() =>
                            setAtrativoForm((prev) => ({
                              ...prev,
                              categoria: cat.value,
                            }))
                          }
                          className={`p-3 rounded-lg border-2 transition-all ${
                            atrativoForm.categoria === cat.value
                              ? cat.color + " border-current font-semibold"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <IconComponent className="w-5 h-5 mx-auto mb-1" />
                          <div className="text-xs font-medium">{cat.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">
                    Imagem
                  </label>
                  {atrativoForm.imagem && (
                    <div className="mb-3 relative h-40 w-full rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={atrativoForm.imagem}
                        alt="Prévia"
                        fill
                        className="object-cover"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          setAtrativoForm((prev) => ({
                            ...prev,
                            imagem: "",
                          }))
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm">Clique para enviar imagem</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImagem}
                      disabled={uploading}
                    />
                  </label>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium">Ordem</label>
                    <Input
                      type="number"
                      value={atrativoForm.ordem}
                      onChange={(e) =>
                        setAtrativoForm((prev) => ({
                          ...prev,
                          ordem: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={atrativoForm.ativo}
                        onChange={(e) =>
                          setAtrativoForm((prev) => ({
                            ...prev,
                            ativo: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <span className="text-sm">Ativo</span>
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium">Nome *</label>
                  <Input
                    value={fonteForm.nome}
                    onChange={(e) =>
                      setFonteForm((prev) => ({
                        ...prev,
                        nome: e.target.value,
                      }))
                    }
                    placeholder="Ex: Fonte Nº 1 - Gasosa"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    value={fonteForm.descricao}
                    onChange={(e) =>
                      setFonteForm((prev) => ({
                        ...prev,
                        descricao: e.target.value,
                      }))
                    }
                    placeholder="Descrição da fonte"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Propriedades</label>
                  <Textarea
                    value={fonteForm.propriedades}
                    onChange={(e) =>
                      setFonteForm((prev) => ({
                        ...prev,
                        propriedades: e.target.value,
                      }))
                    }
                    placeholder="Ex: Benéfica para rins, vesícula e tratamentos de pele"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium">Ordem</label>
                    <Input
                      type="number"
                      value={fonteForm.ordem}
                      onChange={(e) =>
                        setFonteForm((prev) => ({
                          ...prev,
                          ordem: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={fonteForm.ativo}
                        onChange={(e) =>
                          setFonteForm((prev) => ({
                            ...prev,
                            ativo: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <span className="text-sm">Ativo</span>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button
              onClick={activeTab === "atrativos" ? saveAtrativo : saveFonte}
              disabled={loading || uploading}
              className="gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este item? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteItem}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Deletar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
