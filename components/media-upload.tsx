"use client";

import { useState } from "react";
import { Upload, X, Loader, CheckCircle, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface MediaUploadProps {
  tipo: "FOTO" | "VIDEO";
  value: string;
  onChange: (url: string) => void;
  label: string;
  onUploadSuccess?: () => void;
}

export function MediaUpload({
  tipo,
  value,
  onChange,
  label,
  onUploadSuccess
}: MediaUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação por tipo
    if (tipo === "FOTO" && !file.type.startsWith("image/")) {
      setError("Apenas imagens são permitidas");
      return;
    }

    if (tipo === "VIDEO") {
      const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
      if (!allowedVideoTypes.includes(file.type)) {
        setError("Apenas vídeos MP4, WebM ou OGG são permitidos");
        return;
      }
    }

    // Validar tamanho (max 50MB para vídeo, 10MB para foto)
    const maxSize = tipo === "VIDEO" ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`Arquivo muito grande (máximo ${tipo === "VIDEO" ? "50MB" : "10MB"})`);
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

      toast({
        title: "✓ Upload Realizado!",
        description: `${tipo === "FOTO" ? "Foto" : "Vídeo"} enviado(a) com sucesso!`,
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
            className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition ${
              success
                ? "border-green-400 bg-green-50 hover:border-green-500"
                : "border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50"
            }`}
          >
            <div
              className={`flex flex-col items-center gap-2 text-center ${
                success ? "text-green-600" : "text-cyan-600"
              }`}
            >
              {success ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-sm font-medium">Upload realizado!</span>
                </>
              ) : loading ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  <span className="text-sm">Enviando...</span>
                </>
              ) : (
                <>
                  {tipo === "FOTO" ? (
                    <ImageIcon className="w-6 h-6" />
                  ) : (
                    <VideoIcon className="w-6 h-6" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Clique para enviar ou arraste o arquivo</p>
                    <p className="text-xs opacity-75">
                      Máximo {tipo === "VIDEO" ? "50MB" : "10MB"}
                    </p>
                  </div>
                </>
              )}
            </div>
            <input
              type="file"
              accept={tipo === "FOTO" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
          </label>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>

        {value && (
          <div className="flex items-center gap-2 p-3 rounded-lg border-2 border-gray-200 bg-gray-50">
            {tipo === "FOTO" ? (
              <ImageIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
            ) : (
              <VideoIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {value.split("/").pop() || "Arquivo enviado"}
              </p>
              <p className="text-xs text-gray-600 truncate">{value}</p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onChange("")}
              className="flex-shrink-0 h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
