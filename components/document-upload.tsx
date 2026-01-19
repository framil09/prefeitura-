"use client";

import { useState } from "react";
import { Upload, X, Loader, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DocumentUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  acceptedFormats?: string; // ex: ".pdf,.docx,.doc"
  maxSizeMB?: number;
  onUploadSuccess?: () => void;
}

export function DocumentUpload({
  value,
  onChange,
  label,
  acceptedFormats = ".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.zip",
  maxSizeMB = 10,
  onUploadSuccess
}: DocumentUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileName = (url: string) => {
    if (!url) return "";
    const parts = url.split("/");
    return decodeURIComponent(parts[parts.length - 1]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Arquivo muito grande (máximo ${maxSizeMB}MB)`);
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
        description: `Documento "${file.name}" enviado com sucesso!`,
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
            className={`flex items-center justify-center w-full px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition ${
              success
                ? "border-green-400 bg-green-50 hover:border-green-500"
                : "border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50"
            }`}
          >
            <div
              className={`flex items-center gap-2 text-center ${
                success ? "text-green-600" : "text-cyan-600"
              }`}
            >
              {success ? (
                <>
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Upload realizado!</span>
                </>
              ) : loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin flex-shrink-0" />
                  <span className="text-sm">Enviando...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Clique para enviar ou arraste o arquivo</p>
                    <p className="text-xs opacity-75">
                      Máximo {maxSizeMB}MB
                    </p>
                  </div>
                </>
              )}
            </div>
            <input
              type="file"
              accept={acceptedFormats}
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
          </label>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>

        {value && (
          <div className="flex items-start gap-2 p-3 rounded-lg border-2 border-gray-200 bg-gray-50">
            <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {getFileName(value)}
              </p>
              <p className="text-xs text-gray-600">
                {value.length > 50 ? value.substring(0, 50) + "..." : value}
              </p>
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
