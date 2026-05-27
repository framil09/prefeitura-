"use client";

import { useState } from "react";
import {
  Search, FileText, Send, Clock, CheckCircle, ArrowRight,
  Building2, AlertCircle, Loader2, MapPin
} from "lucide-react";

interface Tramitacao {
  deSecretaria: string | null;
  paraSecretaria: string | null;
  observacao: string | null;
  dataEntrada: string;
  dataSaida: string | null;
}

interface ProtocoloInfo {
  numero: string;
  titulo: string;
  tipo: string;
  status: string;
  prioridade: string;
  createdAt: string;
  tramitacoes: Tramitacao[];
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: any }> = {
  ABERTO: { label: "Aberto", color: "bg-blue-100 text-blue-800", icon: FileText },
  EM_ANALISE: { label: "Em Análise", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  EM_TRAMITACAO: { label: "Em Tramitação", color: "bg-orange-100 text-orange-800", icon: ArrowRight },
  AGUARDANDO_RESPOSTA: { label: "Aguardando Resposta", color: "bg-purple-100 text-purple-800", icon: Clock },
  RESPONDIDO: { label: "Respondido", color: "bg-green-100 text-green-800", icon: CheckCircle },
  FINALIZADO: { label: "Finalizado", color: "bg-green-200 text-green-900", icon: CheckCircle },
  ARQUIVADO: { label: "Arquivado", color: "bg-gray-100 text-gray-800", icon: FileText },
};

export function ProtocolosClient() {
  const [activeTab, setActiveTab] = useState<"consultar" | "abrir">("consultar");
  const [searchNumero, setSearchNumero] = useState("");
  const [protocolo, setProtocolo] = useState<ProtocoloInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form
  const [form, setForm] = useState({
    titulo: "", descricao: "", tipo: "solicitacao", prioridade: "normal",
    solicitanteNome: "", solicitanteEmail: "", solicitanteTel: "",
  });

  const consultarProtocolo = async () => {
    if (!searchNumero.trim()) return;
    setLoading(true);
    setProtocolo(null);
    try {
      const res = await fetch(`/api/protocolos?numero=${encodeURIComponent(searchNumero.trim())}`);
      const data = await res.json();
      if (res.ok) {
        setProtocolo(data.protocolo);
      } else {
        setFeedback({ type: "error", message: data.error || "Protocolo não encontrado" });
      }
    } catch {
      setFeedback({ type: "error", message: "Erro ao consultar" });
    } finally {
      setLoading(false);
    }
  };

  const abrirProtocolo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/protocolos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: "success",
          message: `Protocolo criado com sucesso! Número: ${data.protocolo.numero}. Guarde este número para acompanhar.`,
        });
        setForm({ titulo: "", descricao: "", tipo: "solicitacao", prioridade: "normal", solicitanteNome: "", solicitanteEmail: "", solicitanteTel: "" });
      } else {
        setFeedback({ type: "error", message: data.error });
      }
    } catch {
      setFeedback({ type: "error", message: "Erro ao abrir protocolo" });
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = protocolo ? STATUS_MAP[protocolo.status] || STATUS_MAP.ABERTO : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <Building2 className="h-4 w-4" />
            <span className="text-sm font-medium">Hub Integrado de Secretarias</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Central de Protocolos</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Abra solicitações e acompanhe em tempo real a tramitação entre as secretarias municipais.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 p-4 rounded-xl border ${feedback.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            <p className="font-medium">{feedback.message}</p>
            <button onClick={() => setFeedback(null)} className="text-sm underline mt-1">Fechar</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab("consultar")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition ${activeTab === "consultar" ? "bg-white shadow text-indigo-700" : "text-gray-600 hover:text-gray-800"}`}
          >
            <Search className="h-4 w-4" /> Consultar Protocolo
          </button>
          <button
            onClick={() => setActiveTab("abrir")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition ${activeTab === "abrir" ? "bg-white shadow text-indigo-700" : "text-gray-600 hover:text-gray-800"}`}
          >
            <Send className="h-4 w-4" /> Abrir Protocolo
          </button>
        </div>

        {/* Consultar */}
        {activeTab === "consultar" && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8">
              <h2 className="text-xl font-bold mb-4">Consultar Protocolo</h2>
              <div className="flex gap-3">
                <input
                  value={searchNumero}
                  onChange={(e) => setSearchNumero(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && consultarProtocolo()}
                  placeholder="Digite o número do protocolo (ex: PROT-2026-123456)"
                  className="flex-1 border rounded-xl px-4 py-3 text-sm"
                />
                <button
                  onClick={consultarProtocolo}
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Consultar
                </button>
              </div>
            </div>

            {/* Resultado */}
            {protocolo && (
              <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{protocolo.titulo}</h3>
                    {statusInfo && (
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <statusInfo.icon className="h-3.5 w-3.5" />
                        {statusInfo.label}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="font-mono font-medium text-indigo-700">{protocolo.numero}</span>
                    <span>Tipo: {protocolo.tipo}</span>
                    <span>Prioridade: {protocolo.prioridade}</span>
                    <span>Aberto: {new Date(protocolo.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                {/* Timeline de tramitação */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-indigo-600" />
                    Rastreamento de Tramitação
                  </h4>
                  <div className="relative">
                    {protocolo.tramitacoes.map((t, idx) => (
                      <div key={idx} className="flex gap-4 mb-6 last:mb-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full border-2 ${idx === protocolo.tramitacoes.length - 1 ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"}`} />
                          {idx < protocolo.tramitacoes.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2 text-sm">
                            {t.deSecretaria && (
                              <>
                                <span className="font-medium text-gray-700">{t.deSecretaria}</span>
                                <ArrowRight className="h-3 w-3 text-gray-400" />
                              </>
                            )}
                            <span className="font-semibold text-indigo-700">{t.paraSecretaria || "Registro inicial"}</span>
                          </div>
                          {t.observacao && <p className="text-sm text-gray-600 mt-1">{t.observacao}</p>}
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(t.dataEntrada).toLocaleString("pt-BR")}
                            {t.dataSaida && ` → ${new Date(t.dataSaida).toLocaleString("pt-BR")}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Abrir protocolo */}
        {activeTab === "abrir" && (
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-indigo-600" /> Abrir Novo Protocolo
            </h2>
            <form onSubmit={abrirProtocolo} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome *</label>
                  <input required value={form.solicitanteNome} onChange={(e) => setForm({...form, solicitanteNome: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Email *</label>
                  <input required type="email" value={form.solicitanteEmail} onChange={(e) => setForm({...form, solicitanteEmail: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input value={form.solicitanteTel} onChange={(e) => setForm({...form, solicitanteTel: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2.5" placeholder="(00) 00000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assunto *</label>
                <input required value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2.5" placeholder="Resumo da sua solicitação" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada *</label>
                <textarea required value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2.5 h-32" placeholder="Descreva detalhadamente sua solicitação..." />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                  <select required value={form.tipo} onChange={(e) => setForm({...form, tipo: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5">
                    <option value="solicitacao">Solicitação</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="denuncia">Denúncia</option>
                    <option value="informacao">Pedido de Informação</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                  <select value={form.prioridade} onChange={(e) => setForm({...form, prioridade: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5">
                    <option value="baixa">Baixa</option>
                    <option value="normal">Normal</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Abrir Protocolo
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
