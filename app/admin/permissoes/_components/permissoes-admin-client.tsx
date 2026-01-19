"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, Edit2, Lock, Unlock, Search, CheckCircle2, XCircle } from "lucide-react";

interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Permissao {
  id: string;
  userId: string;
  secao: string;
  permitido: boolean;
}

// Agrupar seções por categoria
const SECOES_AGRUPADAS = {
  "Administração": [
    { value: "DASHBOARD", label: "Dashboard" },
    { value: "GESTAO_MUNICIPAL", label: "Gestão Municipal" },
    { value: "SECRETARIAS", label: "Secretarias" },
    { value: "USUARIOS", label: "Usuários" },
    { value: "CONFIGURACAO", label: "Configurações" },
  ],
  "Conteúdo": [
    { value: "TURISMO", label: "Turismo" },
    { value: "NOTICIAS", label: "Notícias" },
    { value: "GALERIA", label: "Galeria" },
  ],
  "Transparência": [
    { value: "TRANSPARENCIA", label: "Portal Transparência" },
    { value: "LICITACOES", label: "Licitações" },
    { value: "EDITAIS_CHAMADAS", label: "Editais e Chamadas" },
    { value: "EMENDAS_IMPOSITIVAS", label: "Emendas Impositivas" },
  ],
};

const PRESETS = {
  EDITOR: { 
    DASHBOARD: true,
    NOTICIAS: true,
    GALERIA: true,
    TURISMO: false,
    LICITACOES: false,
    EDITAIS_CHAMADAS: false,
    EMENDAS_IMPOSITIVAS: false,
    GESTAO_MUNICIPAL: false,
    SECRETARIAS: false,
    USUARIOS: false,
    TRANSPARENCIA: false,
    CONFIGURACAO: false,
  },
  SECRETARIO: {
    DASHBOARD: true,
    NOTICIAS: true,
    GALERIA: true,
    TURISMO: true,
    LICITACOES: true,
    EDITAIS_CHAMADAS: true,
    EMENDAS_IMPOSITIVAS: true,
    GESTAO_MUNICIPAL: false,
    SECRETARIAS: false,
    USUARIOS: false,
    TRANSPARENCIA: false,
    CONFIGURACAO: false,
  },
};

export default function PermissoesAdminClient({
  usuarios,
}: {
  usuarios: Usuario[];
}) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const usuariosFiltrados = usuarios.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const abrirDialog = async (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setLoading(true);

    try {
      const response = await fetch(`/api/permissoes/${usuario.id}`);
      if (response.ok) {
        const data = await response.json();
        setPermissoes(data);
      }
    } catch (error) {
      console.error("Erro ao buscar permissões:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar permissões",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsOpen(true);
    }
  };

  const atualizarPermissao = async (secao: string, permitido: boolean) => {
    if (!selectedUsuario) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/permissoes/${selectedUsuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secao, permitido }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar permissão");
      }

      const updated = await response.json();

      // Atualizar estado local
      const index = permissoes.findIndex((p) => p.secao === secao);
      if (index >= 0) {
        const newPermissoes = [...permissoes];
        newPermissoes[index] = updated;
        setPermissoes(newPermissoes);
      } else {
        setPermissoes([...permissoes, updated]);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const aplicarPreset = async (presetName: "EDITOR" | "SECRETARIO") => {
    if (!selectedUsuario) return;

    setSaving(true);
    try {
      const preset = PRESETS[presetName];
      
      for (const [secao, permitido] of Object.entries(preset)) {
        const response = await fetch(`/api/permissoes/${selectedUsuario.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secao, permitido }),
        });

        if (!response.ok) throw new Error("Erro ao atualizar permissão");

        const updated = await response.json();
        const index = permissoes.findIndex((p) => p.secao === secao);
        if (index >= 0) {
          const newPermissoes = [...permissoes];
          newPermissoes[index] = updated;
          setPermissoes(newPermissoes);
        } else {
          setPermissoes([...permissoes, updated]);
        }
      }

      toast({
        title: "Sucesso",
        description: `Preset ${presetName} aplicado com sucesso`,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const temPermissao = (secao: string): boolean => {
    const permissao = permissoes.find((p) => p.secao === secao);
    return permissao ? permissao.permitido : true;
  };

  const contagemPermissoes = (usuario: Usuario): number => {
    // Para simplificar, retorna um número padrão baseado no role
    if (usuario.role === "ADMIN") return 11;
    if (usuario.role === "SECRETARIO") return 6;
    return 3;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Permissões de Usuários</h2>
        <p className="text-muted-foreground mt-1">
          Controle granular de acesso às seções do painel administrativo
        </p>
      </div>

      {/* Card de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários do Sistema</CardTitle>
          <CardDescription>Clique em um usuário para gerenciar suas permissões de acesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barra de Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabela de Usuários */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Permissões</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {usuarios.length === 0 ? "Nenhum usuário cadastrado" : "Nenhum usuário encontrado"}
                    </TableCell>
                  </TableRow>
                ) : (
                  usuariosFiltrados.map((usuario) => (
                    <TableRow key={usuario.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{usuario.name}</TableCell>
                      <TableCell className="text-sm text-gray-600">{usuario.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            usuario.role === "ADMIN" 
                              ? "bg-red-50 text-red-700 border-red-300" 
                              : usuario.role === "SECRETARIO"
                              ? "bg-blue-50 text-blue-700 border-blue-300"
                              : "bg-green-50 text-green-700 border-green-300"
                          }
                        >
                          {usuario.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium text-gray-600">
                          {contagemPermissoes(usuario)}/11
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => abrirDialog(usuario)}
                          className="gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Gerenciar
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

      {/* Dialog de Permissões */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Permissões - {selectedUsuario?.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedUsuario?.email} • Role: <Badge variant="outline">{selectedUsuario?.role}</Badge>
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {/* Presets Rápidos (apenas para não-ADMIN) */}
              {selectedUsuario?.role !== "ADMIN" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Presets Rápidos</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => aplicarPreset("EDITOR")}
                      disabled={saving}
                      className="gap-2"
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      Preset Editor
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => aplicarPreset("SECRETARIO")}
                      disabled={saving}
                      className="gap-2"
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      Preset Secretário
                    </Button>
                  </div>
                  <p className="text-xs text-blue-700 mt-2">
                    Os presets aplicam permissões padrão para cada tipo de usuário
                  </p>
                </div>
              )}

              {/* Seções Agrupadas */}
              {Object.entries(SECOES_AGRUPADAS).map(([categoria, secoes]) => (
                <div key={categoria} className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-widest ml-1 flex items-center gap-2">
                    {categoria}
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  </h3>
                  <div className="grid gap-3">
                    {secoes.map((secao) => {
                      const ativo = temPermissao(secao.value);
                      return (
                        <div
                          key={secao.value}
                          className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 group cursor-pointer ${
                            ativo
                              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-sm hover:shadow-md hover:from-green-100 hover:to-emerald-100 hover:border-green-400"
                              : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300 shadow-sm hover:shadow-md hover:from-gray-100 hover:to-slate-100 hover:border-gray-400"
                          }`}
                          onClick={() => atualizarPermissao(secao.value, !ativo)}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                ativo
                                  ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                                  : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                              }`}
                            >
                              {ativo ? (
                                <Unlock className="w-5 h-5" />
                              ) : (
                                <Lock className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`font-semibold text-sm transition-colors duration-300 ${
                                ativo ? "text-green-900" : "text-gray-700"
                              }`}>
                                {secao.label}
                              </p>
                              <p className={`text-xs transition-colors duration-300 ${
                                ativo ? "text-green-600" : "text-gray-500"
                              }`}>
                                {ativo ? "✓ Acesso permitido" : "✕ Acesso bloqueado"}
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={ativo}
                            onCheckedChange={(checked) =>
                              atualizarPermissao(secao.value, checked)
                            }
                            disabled={saving}
                            className="ml-4 flex-shrink-0"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
