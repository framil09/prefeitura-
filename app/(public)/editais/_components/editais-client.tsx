"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, FileText, Search, Calendar } from "lucide-react";

interface Edital {
  id: string;
  numero: string;
  titulo: string;
  descricao: string | null;
  tipo: string;
  dataAbertura: Date | null;
  dataEncerramento: Date | null;
  documentoUrl: string | null;
  resultadoUrl: string | null;
  conteudo: string | null;
  destaque: boolean;
}

interface EditaisClientProps {
  editais: Edital[];
}

export function EditaisClient({ editais }: EditaisClientProps) {
  const [search, setSearch] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);

  const tiposUnicos = Array.from(new Set(editais.map((e) => e.tipo).filter(Boolean)));

  const filtered = editais.filter((edital) => {
    const matchSearch =
      edital.numero.toLowerCase().includes(search.toLowerCase()) ||
      edital.titulo.toLowerCase().includes(search.toLowerCase()) ||
      edital.descricao?.toLowerCase().includes(search.toLowerCase());

    const matchTipo = !selectedTipo || edital.tipo === selectedTipo;

    return matchSearch && matchTipo;
  });

  const destaque = filtered.filter((e) => e.destaque);
  const outros = filtered.filter((e) => !e.destaque);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Filtros */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por número ou título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedTipo === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTipo(null)}
          >
            Todos
          </Button>
          {tiposUnicos.map((tipo) => (
            <Button
              key={tipo}
              variant={selectedTipo === tipo ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTipo(tipo as string)}
            >
              {tipo}
            </Button>
          ))}
        </div>
      </div>

      {/* Destaques */}
      {destaque.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-yellow-500">⭐</span> Editais em Destaque
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destaque.map((edital) => (
              <Card
                key={edital.id}
                className="border-2 border-yellow-300 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      {edital.numero}
                    </span>
                    <Badge className="bg-blue-600">{edital.tipo}</Badge>
                  </div>
                  <CardTitle className="text-base leading-tight">{edital.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {edital.descricao && (
                    <p className="text-sm text-gray-600 line-clamp-2">{edital.descricao}</p>
                  )}

                    {edital.dataAbertura && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>
                          Aberto:{" "}
                          {new Date(edital.dataAbertura).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    )}
                    {edital.dataEncerramento && (
                      <div className="flex items-center gap-2 font-semibold text-red-600">
                        <Calendar className="w-3 h-3" />
                        <span>
                          Encerra:{" "}
                          {new Date(edital.dataEncerramento).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    )}

                  <div className="flex gap-2 pt-3 flex-wrap">
                    {edital.documentoUrl && (
                      <a
                        href={edital.documentoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition"
                      >
                        <Download className="w-3 h-3" />
                        Edital
                      </a>
                    )}
                    {edital.resultadoUrl && (
                      <a
                        href={edital.resultadoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded transition"
                      >
                        <FileText className="w-3 h-3" />
                        Resultado
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Listagem Principal */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Todos os Editais ({outros.length})
        </h2>

        {outros.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500">Nenhum edital encontrado</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {outros.map((edital) => (
              <Card
                key={edital.id}
                className="hover:shadow-md transition-shadow cursor-pointer group"
              >
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-4 gap-4 items-start">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                          {edital.numero}
                        </span>
                        <Badge variant="secondary">{edital.tipo}</Badge>
                      </div>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition">
                        {edital.titulo}
                      </h3>
                      {edital.descricao && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {edital.descricao}
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 space-y-1">
                      {edital.dataAbertura && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Aberto:{" "}
                          {new Date(edital.dataAbertura).toLocaleDateString("pt-BR")}
                        </div>
                      )}
                      {edital.dataEncerramento && (
                        <div className="flex items-center gap-1 font-semibold text-red-600">
                          <Calendar className="w-3 h-3" />
                          Encerra:{" "}
                          {new Date(edital.dataEncerramento).toLocaleDateString("pt-BR")}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 justify-end flex-wrap">
                      {edital.documentoUrl && (
                        <a
                          href={edital.documentoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition"
                        >
                          <Download className="w-3 h-3" />
                          Edital
                        </a>
                      )}
                      {edital.resultadoUrl && (
                        <a
                          href={edital.resultadoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded transition"
                        >
                          <FileText className="w-3 h-3" />
                          Resultado
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
