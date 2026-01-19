"use client";

import { useState } from "react";
import { Upload, X, Loader, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { refreshImageCache } from "@/hooks/use-image-cache-refresh";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  previewWidth?: number;
  previewHeight?: number;
  onUploadSuccess?: () => void;
  autoRefreshCache?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  label,
  previewWidth = 160,
  previewHeight = 200,
  onUploadSuccess,
  autoRefreshCache = true
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      setError("Apenas imagens são permitidas");
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Imagem muito grande (máximo 5MB)");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao fazer upload");
      }

      const data = await res.json();
      onChange(data.url);
      setSuccess(true);

      // Limpar cache de imagens para forçar recarga do navegador
      if (autoRefreshCache) {
        setTimeout(() => {
          refreshImageCache();
        }, 100);
      }

      toast({
        title: "✓ Upload Realizado!",
        description: "Imagem enviada com sucesso. Não esqueça de salvar as mudanças.",
        variant: "default",
        className: "bg-green-500 text-white border-green-600",
        duration: 3000,
      });

      setTimeout(() => setSuccess(false), 3000);
      onUploadSuccess?.();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao fazer upload";
      setError(errorMsg);

      toast({
        title: "❌ Erro no Upload",
        description: errorMsg,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div className="flex gap-4">
        <div className="flex-1">
          <label
            className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition ${
              success
                ? "border-green-400 bg-green-50 hover:border-green-500"
                : "border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50"
            }`}
          >
            <div
              className={`flex items-center gap-2 ${
                success ? "text-green-600" : "text-cyan-600"
              }`}
            >
              {success ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload realizado!</span>
                </>
              ) : loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Enviando...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Clique para enviar ou arraste</span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
          </label>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>

        {value && (
          <div
            className="relative rounded-lg overflow-hidden border-2 border-gray-200"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E";
              }}
            />
            <button
              onClick={() => onChange("")}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {!value && (
        <p className="text-xs text-gray-500">
          Formatos: JPG, PNG, WebP • Tamanho máximo: 5MB
        </p>
      )}
    </div>
  );
}
