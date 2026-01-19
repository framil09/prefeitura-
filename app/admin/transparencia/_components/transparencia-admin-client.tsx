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
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Loader2,
  Eye,
  EyeOff,
  FileText,
  Download,
} from "lucide-react";

interface DocumentoTransparencia {
  id: string;
  titulo: string;
  descricao?: string;
  categoria: string;
  url?: string;
  arquivo?: string;
  dataPublicacao?: string;
  ordem: number;
  ativo: boolean;
  destaque: boolean;
  createdAt: string;
}

const CATEGORIAS = [
  { value: "orcamento", label: "Orçamento" },
  { value: "licitacoes", label: "Licitações e Contratos" },
  { value: "gestao", label: "Gestão Pública" },
  { value: "receitas", label: "Receitas e Despesas" },
];

export default function TransparenciaAdminClient({
  initialDocumentos,
}: {
  initialDocumentos: DocumentoTransparencia[];
}) {
  const { toast } = useToast();
  const [documentos, setDocumentos] = useState<DocumentoTransparencia[]>(
    initialDocumentos
  );
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "orcamento",
    url: "",
    arquivo: "",
    dataPublicacao: new Date().toISOString().split("T")[0],
    ordem: 0,
    ativo: true,
    destaque: false,
  });

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "orcamento",
      url: "",
      arquivo: "",
      dataPublicacao: new Date().toISOString().split("T")[0],
      ordem: 0,
      ativo: true,
      destaque: false,
    });
    setEditingId(null);
  };

  const openDialog = (documento?: DocumentoTransparencia) => {
    if (documento) {
      setFormData({
        ...documento,
        dataPublicacao: documento.dataPublicacao?.split("T")[0] || "",
      });
      setEditingId(documento.id);
    } else {
      resetForm();
    }
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoria: value }));
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      const response = await fetch("/api/transparencia/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao fazer upload");
      }

      const { url } = await response.json();
      setFormData((prev) => ({
        ...prev,
        arquivo: url,
      }));

      toast({
        title: "Sucesso",
        description: "Arquivo enviado com sucesso",
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

  const handleSave = async () => {
    if (!formData.titulo.trim()) {
      toast({
        title: "Erro",
        description: "Título é obrigatório",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/transparencia/documentos/${editingId}`
        : "/api/transparencia/documentos";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar");
      }

      const savedDocumento = await response.json();

      if (editingId) {
        setDocumentos((prev) =>
          prev.map((d) => (d.id === editingId ? savedDocumento : d))
        );
        toast({
          title: "Sucesso",
          description: "Documento atualizado com sucesso",
        });
      } else {
        setDocumentos((prev) => [savedDocumento, ...prev]);
        toast({
          title: "Sucesso",
          description: "Documento criado com sucesso",
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

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/transparencia/documentos/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar");
      }

      setDocumentos((prev) => prev.filter((d) => d.id !== deleteId));
      toast({
        title: "Sucesso",
        description: "Documento deletado com sucesso",
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

  const toggleAtivo = async (id: string, ativo: boolean) => {
    try {
      const documento = documentos.find((d) => d.id === id);
      if (!documento) return;

      const response = await fetch(`/api/transparencia/documentos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...documento, ativo: !ativo }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      setDocumentos((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ativo: !ativo } : d))
      );

      toast({
        title: "Sucesso",
        description: `Documento ${!ativo ? "ativado" : "desativado"}`,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleDestaque = async (id: string, destaque: boolean) => {
    try {
      const documento = documentos.find((d) => d.id === id);
      if (!documento) return;

      const response = await fetch(`/api/transparencia/documentos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...documento, destaque: !destaque }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      setDocumentos((prev) =>
        prev.map((d) => (d.id === id ? { ...d, destaque: !destaque } : d))
      );

      toast({
        title: "Sucesso",
        description: `Documento ${!destaque ? "marcado" : "desmarcado"} como destaque`,
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Portal da Transparência
          </h2>
          <p className="text-muted-foreground mt-1">
            Gerenciar documentos públicos e informações de transparência
          </p>
        </div>
        <Button onClick={() => openDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Documento
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-center">Arquivo</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Nenhum documento cadastrado
                    </TableCell>
                  </TableRow>
                ) : (
                  documentos.map((documento) => (
                    <TableRow key={documento.id}>
                      <TableCell className="font-medium">
                        {documento.titulo}
                        {documento.destaque && (
                          <Badge className="ml-2" variant="default">
                            Destaque
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {CATEGORIAS.find(
                            (c) => c.value === documento.categoria
                          )?.label || documento.categoria}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {documento.arquivo ? (
                          <a
                            href={documento.arquivo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        ) : documento.url ? (
                          <span className="text-green-600 text-sm">Link</span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAtivo(documento.id, documento.ativo)}
                          className="gap-1"
                        >
                          {documento.ativo ? (
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
                          onClick={() => openDialog(documento)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(documento.id)}
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

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar Documento" : "Novo Documento de Transparência"}
            </DialogTitle>
            <DialogDescription>
              Adicione ou edite um documento público para o Portal da Transparência
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Título */}
            <div>
              <label className="text-sm font-medium">Título *</label>
              <Input
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Ex: Orçamento 2025"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                placeholder="Descrição do documento"
                rows={3}
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="text-sm font-medium">Categoria</label>
              <Select
                value={formData.categoria}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* URL */}
            <div>
              <label className="text-sm font-medium">URL (Link Externo)</label>
              <Input
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://exemplo.com"
                type="url"
              />
            </div>

            {/* Upload de Arquivo */}
            <div>
              <label className="text-sm font-medium block mb-3">
                Arquivo (PDF, DOC, XLS, etc)
              </label>
              {formData.arquivo && (
                <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center justify-between">
                  <span className="text-sm text-green-700">
                    {formData.arquivo.split("/").pop()}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, arquivo: "" }))
                    }
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Clique ou arraste um arquivo</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
                />
              </label>
            </div>

            {/* Data */}
            <div>
              <label className="text-sm font-medium">Data de Publicação</label>
              <Input
                name="dataPublicacao"
                value={formData.dataPublicacao}
                onChange={handleInputChange}
                type="date"
              />
            </div>

            {/* Ordem */}
            <div>
              <label className="text-sm font-medium">Ordem</label>
              <Input
                name="ordem"
                value={formData.ordem}
                onChange={handleInputChange}
                type="number"
              />
            </div>

            {/* Opções */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="ativo"
                  checked={formData.ativo}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span className="text-sm">Ativo</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="destaque"
                  checked={formData.destaque}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span className="text-sm">Destaque</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
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
              Tem certeza que deseja deletar este documento? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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
