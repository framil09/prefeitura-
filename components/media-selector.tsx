"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Search, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Midia {
  id: string;
  titulo: string;
  url: string;
  thumbnail?: string;
  tipo: "FOTO" | "VIDEO";
  destaque: boolean;
}

interface MediaSelectorProps {
  tipo?: "FOTO" | "VIDEO" | "AMBOS";
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export function MediaSelector({
  tipo = "AMBOS",
  value,
  onChange,
  label
}: MediaSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [midias, setMidias] = useState<Midia[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchMidias();
    }
  }, [isOpen]);

  const fetchMidias = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/midias");
      if (res.ok) {
        const data = await res.json();
        setMidias(data);
      }
    } catch (error) {
      console.error("Erro ao carregar mídias:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMidias = midias.filter((m) => {
    const matchType = tipo === "AMBOS" || m.tipo === tipo;
    const matchSearch = m.titulo.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const selectedMedia = midias.find((m) => m.url === value);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="flex-1"
        >
          Selecionar Mídia
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {selectedMedia && (
        <div className="p-3 rounded-lg border border-cyan-200 bg-cyan-50 flex items-center gap-3">
          {selectedMedia.tipo === "FOTO" ? (
            <ImageIcon className="w-5 h-5 text-cyan-600 flex-shrink-0" />
          ) : (
            <VideoIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {selectedMedia.titulo}
            </p>
            <p className="text-xs text-gray-600 truncate">{selectedMedia.url}</p>
          </div>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Selecionar Mídia</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Pesquisar por título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Carregando mídias...</p>
              </div>
            ) : filteredMidias.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhuma mídia encontrada</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
                {filteredMidias.map((midia) => (
                  <button
                    key={midia.id}
                    onClick={() => {
                      onChange(midia.url);
                      setIsOpen(false);
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition hover:border-cyan-500 ${
                      value === midia.url
                        ? "border-cyan-500 ring-2 ring-cyan-400"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={midia.thumbnail || midia.url}
                      alt={midia.titulo}
                      fill
                      className="object-cover"
                    />
                    {midia.tipo === "VIDEO" && (
                      <Badge className="absolute top-2 left-2 bg-red-600">
                        <VideoIcon className="w-3 h-3" />
                      </Badge>
                    )}
                    {midia.destaque && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500">
                        Destaque
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                      <p className="text-white text-xs font-semibold text-center px-2 line-clamp-2">
                        {midia.titulo}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
