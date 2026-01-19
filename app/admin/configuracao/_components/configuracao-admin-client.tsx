"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, User, Image as ImageIcon, MapPin, Globe, Check, AlertCircle, X } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { refreshImageCache } from "@/hooks/use-image-cache-refresh";

interface ConfiguracaoAdminClientProps {
  config: any;
  prefeitos: any[];
}

interface FormErrors {
  [key: string]: string;
}

export function ConfiguracaoAdminClient({ config: initialConfig, prefeitos }: ConfiguracaoAdminClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nomeCidade: initialConfig?.nomeCidade ?? "Lambari",
    slogan: initialConfig?.slogan ?? "Estância Hidromineral",
    fotoSlogan: initialConfig?.fotoSlogan ?? "",
    logoUrl: initialConfig?.logoUrl ?? "",
    bannerUrl: initialConfig?.bannerUrl ?? "",
    prefeito: initialConfig?.prefeito ?? "",
    fotoPrefeito: initialConfig?.fotoPrefeito ?? "",
    vicePrefeito: initialConfig?.vicePrefeito ?? "",
    fotoVicePrefeito: initialConfig?.fotoVicePrefeito ?? "",
    telefone: initialConfig?.telefone ?? "",
    email: initialConfig?.email ?? "",
    endereco: initialConfig?.endereco ?? "",
    horarioAtendimento: initialConfig?.horarioAtendimento ?? "",
    facebookUrl: initialConfig?.facebookUrl ?? "",
    instagramUrl: initialConfig?.instagramUrl ?? "",
    youtubeUrl: initialConfig?.youtubeUrl ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("identidade");

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.nomeCidade.trim()) {
      newErrors.nomeCidade = "Nome da cidade é obrigatório";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    }
    if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      const res = await fetch("/api/configuracao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccessMessage("✓ Configurações salvas com sucesso!");
        toast({
          title: "✓ Sucesso!",
          description: "Todas as configurações foram salvas com sucesso. O site está sendo atualizado...",
          variant: "default",
          className: "bg-green-500 text-white border-green-600 shadow-lg",
          duration: 5000,
        });
        
        // Atualiza o cache de imagens e aguarda antes de fazer refresh
        setTimeout(() => {
          refreshImageCache();
        }, 500);

        // Aguarda um pouco e depois recarrega os dados
        await new Promise(resolve => setTimeout(resolve, 1500));
        router.refresh();
        setSuccessMessage("");
      } else {
        setErrors({ submit: "Erro ao salvar configurações. Tente novamente." });
        toast({
          title: "❌ Erro!",
          description: "Erro ao salvar configurações. Tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      setErrors({ submit: "Erro na conexão. Verifique sua internet." });
      toast({
        title: "❌ Erro na Conexão!",
        description: "Erro na conexão. Verifique sua internet.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Configurações do Site</h1>
            <p className="text-gray-600 mt-1">Gerencie a identidade, informações e conteúdo do site da prefeitura</p>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      {successMessage && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
          <Check className="w-5 h-5" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {errors.submit && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">{errors.submit}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="identidade">Identidade Visual</TabsTrigger>
            <TabsTrigger value="informacoes">Informações</TabsTrigger>
            <TabsTrigger value="administracao">Administração</TabsTrigger>
            <TabsTrigger value="redes">Redes Sociais</TabsTrigger>
          </TabsList>
        {/* Aba 1: Identidade Visual */}
        <TabsContent value="identidade" className="space-y-6">
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <ImageIcon className="w-5 h-5" />
                Identidade Visual
              </CardTitle>
              <p className="text-sm text-blue-700 mt-1">Configure o logo e banner principal do site</p>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Logo */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-800">🏛️ Logo do Site</label>
                    <p className="text-xs text-gray-500">Aparece no cabeçalho do site</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Tamanho: 500x500px</span>
                </div>
                <ImageUpload
                  label="Fazer upload da logo"
                  value={formData.logoUrl}
                  onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                  previewWidth={120}
                  previewHeight={120}
                />
              </div>

              <div className="border-t pt-6">
                {/* Banner/Capa */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <label className="block text-sm font-bold mb-1 text-gray-800">📸 Capa/Banner Principal</label>
                      <p className="text-xs text-gray-500">Imagem grande exibida na página inicial</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Tamanho: 1920x400px</span>
                  </div>
                  <ImageUpload
                    label="Fazer upload da capa"
                    value={formData.bannerUrl}
                    onChange={(url) => setFormData({ ...formData, bannerUrl: url })}
                    previewWidth={400}
                    previewHeight={200}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 2: Informações Básicas */}
        <TabsContent value="informacoes" className="space-y-6">
          <Card className="border-2 border-cyan-200">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100 border-b">
              <CardTitle className="flex items-center gap-2 text-cyan-900">
                <MapPin className="w-5 h-5" />
                Informações Gerais
              </CardTitle>
              <p className="text-sm text-cyan-700 mt-1">Dados básicos da prefeitura</p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-800">Nome da Cidade</label>
                  <Input
                    value={formData.nomeCidade}
                    onChange={(e) => setFormData({ ...formData, nomeCidade: e.target.value })}
                    placeholder="Lambari"
                    className={`bg-white border-gray-300 ${errors.nomeCidade ? 'border-red-500' : ''}`}
                  />
                  {errors.nomeCidade && <p className="text-xs text-red-600 mt-1">{errors.nomeCidade}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-800">Slogan/Lema</label>
                  <Input
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    placeholder="Ex: Estância Hidromineral"
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="space-y-3 mb-6">
                  <label className="block text-sm font-bold text-gray-800">📷 Foto do Slogan (Hero Section)</label>
                  <p className="text-xs text-gray-500">Imagem exibida junto ao slogan na página inicial</p>
                  <ImageUpload
                    label="Fazer upload da foto do slogan"
                    value={formData.fotoSlogan}
                    onChange={(url) => setFormData({ ...formData, fotoSlogan: url })}
                    previewWidth={300}
                    previewHeight={200}
                  />
                </div>
              </div>

              <div className="border-t pt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">📞 Telefone</label>
                    <Input
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(35) 3334-1234"
                      className={`bg-white border-gray-300 ${errors.telefone ? 'border-red-500' : ''}`}
                    />
                    {errors.telefone && <p className="text-xs text-red-600 mt-1">{errors.telefone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">✉️ Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contato@lambari.mg.gov.br"
                      className={`bg-white border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-800">📍 Endereço Completo</label>
                  <Textarea
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    placeholder="Prefeitura de Lambari - Rua..."
                    rows={3}
                    className={`bg-white border-gray-300 ${errors.endereco ? 'border-red-500' : ''}`}
                  />
                  {errors.endereco && <p className="text-xs text-red-600 mt-1">{errors.endereco}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-800">🕐 Horário de Atendimento</label>
                  <Input
                    value={formData.horarioAtendimento}
                    onChange={(e) => setFormData({ ...formData, horarioAtendimento: e.target.value })}
                    placeholder="Segunda a Sexta: 8h às 17h"
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 3: Administração */}
        <TabsContent value="administracao" className="space-y-6">
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <User className="w-5 h-5" />
                Administração 2025-2028
              </CardTitle>
              <p className="text-sm text-purple-700 mt-1">Configure os gestores municipais</p>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Prefeito */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  👨‍💼 Prefeito Municipal
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">Selecionar da Gestão</label>
                    <select
                      value={formData.prefeito}
                      onChange={(e) => {
                        const prefeito = prefeitos.find(p => p.nome === e.target.value);
                        setFormData({
                          ...formData,
                          prefeito: e.target.value,
                          fotoPrefeito: prefeito?.foto ?? ""
                        });
                      }}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Selecione um prefeito</option>
                      {prefeitos.map((p) => (
                        <option key={p.id} value={p.nome}>{p.nome}</option>
                      ))}
                    </select>
                    <label className="block text-sm font-bold mt-4 mb-2 text-gray-800">Ou Digite o Nome</label>
                    <Input
                      value={formData.prefeito}
                      onChange={(e) => setFormData({ ...formData, prefeito: e.target.value })}
                      placeholder="Nome completo"
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">Foto</label>
                    <ImageUpload
                      label="Foto do Prefeito"
                      value={formData.fotoPrefeito}
                      onChange={(url) => setFormData({ ...formData, fotoPrefeito: url })}
                      previewWidth={128}
                      previewHeight={160}
                    />
                  </div>
                </div>
              </div>

              {/* Vice-Prefeito */}
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-900 mb-4 flex items-center gap-2">
                  👔 Vice-Prefeito
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">Selecionar da Gestão</label>
                    <select
                      value={formData.vicePrefeito}
                      onChange={(e) => {
                        const vice = prefeitos.find(p => p.nome === e.target.value);
                        setFormData({
                          ...formData,
                          vicePrefeito: e.target.value,
                          fotoVicePrefeito: vice?.foto ?? ""
                        });
                      }}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Selecione um vice-prefeito</option>
                      {prefeitos.map((p) => (
                        <option key={p.id} value={p.nome}>{p.nome}</option>
                      ))}
                    </select>
                    <label className="block text-sm font-bold mt-4 mb-2 text-gray-800">Ou Digite o Nome</label>
                    <Input
                      value={formData.vicePrefeito}
                      onChange={(e) => setFormData({ ...formData, vicePrefeito: e.target.value })}
                      placeholder="Nome completo"
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">Foto</label>
                    <ImageUpload
                      label="Foto do Vice-Prefeito"
                      value={formData.fotoVicePrefeito}
                      onChange={(url) => setFormData({ ...formData, fotoVicePrefeito: url })}
                      previewWidth={128}
                      previewHeight={160}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 4: Redes Sociais */}
        <TabsContent value="redes" className="space-y-6">
          <Card className="border-2 border-pink-200">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
              <CardTitle className="flex items-center gap-2 text-pink-900">
                <Globe className="w-5 h-5" />
                Redes Sociais
              </CardTitle>
              <p className="text-sm text-pink-700 mt-1">Links para os perfis da prefeitura</p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-2xl">🔵</span>
                  <div className="flex-1">
                    <label className="block text-sm font-bold mb-2 text-gray-800">Facebook</label>
                    <Input
                      value={formData.facebookUrl}
                      onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/prefeitura"
                      className="bg-white border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <span className="text-2xl">📷</span>
                  <div className="flex-1">
                    <label className="block text-sm font-bold mb-2 text-gray-800">Instagram</label>
                    <Input
                      value={formData.instagramUrl}
                      onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/prefeitura"
                      className="bg-white border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-2xl">▶️</span>
                  <div className="flex-1">
                    <label className="block text-sm font-bold mb-2 text-gray-800">YouTube</label>
                    <Input
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      placeholder="https://youtube.com/@prefeitura"
                      className="bg-white border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>

        {/* Botão Submit */}
        <div className="flex gap-3 pt-6 border-t">
          <Button 
            type="submit" 
            disabled={loading} 
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-12 text-base font-bold"
          >
            {loading ? "⏳ Salvando..." : "💾 Salvar Todas as Configurações"}
          </Button>
        </div>
      </form>
    </div>
  );
}
