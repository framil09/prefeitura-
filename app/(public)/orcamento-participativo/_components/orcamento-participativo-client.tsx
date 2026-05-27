"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Vote, Trophy, Star, Medal, TrendingUp, Plus, ThumbsUp,
  Users, Target, Sparkles, ChevronDown, Search, Filter
} from "lucide-react";

interface Proposta {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  valorEstimado: number | null;
  bairro: string | null;
  autorNome: string;
  status: string;
  totalVotos: number;
  createdAt: string;
}

interface Stats {
  totalPropostas: number;
  totalVotos: number;
}

const CATEGORIAS = [
  { value: "educacao", label: "📚 Educação", color: "bg-blue-100 text-blue-800" },
  { value: "saude", label: "🏥 Saúde", color: "bg-red-100 text-red-800" },
  { value: "infraestrutura", label: "🏗️ Infraestrutura", color: "bg-yellow-100 text-yellow-800" },
  { value: "cultura", label: "🎭 Cultura", color: "bg-purple-100 text-purple-800" },
  { value: "esporte", label: "⚽ Esporte", color: "bg-green-100 text-green-800" },
  { value: "meio_ambiente", label: "🌿 Meio Ambiente", color: "bg-emerald-100 text-emerald-800" },
  { value: "seguranca", label: "🛡️ Segurança", color: "bg-orange-100 text-orange-800" },
  { value: "assistencia_social", label: "🤝 Assistência Social", color: "bg-pink-100 text-pink-800" },
];

export function OrcamentoParticipativoClient() {
  const [propostas, setPropostas] = useState<Proposta[]>([]);
  const [stats, setStats] = useState<Stats>({ totalPropostas: 0, totalVotos: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [votingId, setVotingId] = useState<string | null>(null);
  const [voteEmail, setVoteEmail] = useState("");
  const [voteName, setVoteName] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form state
  const [form, setForm] = useState({
    titulo: "", descricao: "", categoria: "", valorEstimado: "",
    bairro: "", autorNome: "", autorEmail: "",
  });

  const fetchPropostas = useCallback(async () => {
    try {
      const params = new URLSearchParams({ status: "ABERTA_VOTACAO" });
      if (filtroCategoria) params.set("categoria", filtroCategoria);
      const res = await fetch(`/api/orcamento-participativo?${params}`);
      const data = await res.json();
      setPropostas(data.propostas || []);
      setStats(data.stats || { totalPropostas: 0, totalVotos: 0 });
    } catch {
      console.error("Erro ao carregar propostas");
    } finally {
      setLoading(false);
    }
  }, [filtroCategoria]);

  useEffect(() => { fetchPropostas(); }, [fetchPropostas]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/orcamento-participativo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          valorEstimado: form.valorEstimado ? parseFloat(form.valorEstimado) : null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", message: `${data.message} Você ganhou ${data.pontosGanhos} pontos! 🎉` });
        setShowForm(false);
        setForm({ titulo: "", descricao: "", categoria: "", valorEstimado: "", bairro: "", autorNome: "", autorEmail: "" });
        fetchPropostas();
      } else {
        setFeedback({ type: "error", message: data.error });
      }
    } catch {
      setFeedback({ type: "error", message: "Erro ao enviar proposta" });
    }
  };

  const handleVote = async (propostaId: string) => {
    if (!voteEmail || !voteName) {
      setFeedback({ type: "error", message: "Informe seu nome e email para votar" });
      return;
    }
    try {
      const res = await fetch("/api/orcamento-participativo/votar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propostaId, nome: voteName, email: voteEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        let msg = `Voto registrado! +${data.pontosGanhos} pontos. Nível: ${data.nivel}`;
        if (data.novasBadges?.length > 0) {
          msg += ` 🏆 Nova badge: ${data.novasBadges.map((b: any) => `${b.icone} ${b.titulo}`).join(", ")}`;
        }
        setFeedback({ type: "success", message: msg });
        setVotingId(null);
        fetchPropostas();
      } else {
        setFeedback({ type: "error", message: data.error });
      }
    } catch {
      setFeedback({ type: "error", message: "Erro ao votar" });
    }
  };

  const getCategoriaInfo = (cat: string) => CATEGORIAS.find((c) => c.value === cat) || { label: cat, color: "bg-gray-100 text-gray-800" };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Democracia Digital</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Orçamento Participativo</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Sua voz importa! Proponha projetos e vote nas prioridades do município.
            Ganhe pontos e badges por sua participação cidadã.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-3 text-center">
              <p className="text-3xl font-bold">{stats.totalPropostas}</p>
              <p className="text-sm text-blue-200">Propostas</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-3 text-center">
              <p className="text-3xl font-bold">{stats.totalVotos}</p>
              <p className="text-sm text-blue-200">Votos</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-3 text-center">
              <p className="text-3xl font-bold">{CATEGORIAS.length}</p>
              <p className="text-sm text-blue-200">Categorias</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 p-4 rounded-xl border ${feedback.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            <p>{feedback.message}</p>
            <button onClick={() => setFeedback(null)} className="text-sm underline mt-1">Fechar</button>
          </div>
        )}

        {/* Actions bar */}
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-200"
            >
              <Plus className="h-5 w-5" /> Nova Proposta
            </button>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white"
            >
              <option value="">Todas as categorias</option>
              {CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" /> Criar Nova Proposta
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome *</label>
                  <input required value={form.autorNome} onChange={(e) => setForm({...form, autorNome: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Email *</label>
                  <input required type="email" value={form.autorEmail} onChange={(e) => setForm({...form, autorEmail: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5" placeholder="seu@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Proposta *</label>
                <input required value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2.5" placeholder="Ex: Construção de praça no Bairro Centro" minLength={10} maxLength={200} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada *</label>
                <textarea required value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2.5 h-32" placeholder="Descreva em detalhes sua proposta, benefícios esperados e público-alvo..." minLength={50} maxLength={2000} />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                  <select required value={form.categoria} onChange={(e) => setForm({...form, categoria: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5">
                    <option value="">Selecione</option>
                    {CATEGORIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado (R$)</label>
                  <input type="number" value={form.valorEstimado} onChange={(e) => setForm({...form, valorEstimado: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5" placeholder="0.00" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <input value={form.bairro} onChange={(e) => setForm({...form, bairro: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2.5" placeholder="Nome do bairro" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-medium">
                  Enviar Proposta (+10 pontos)
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border rounded-xl hover:bg-gray-50">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Propostas */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-500">Carregando propostas...</p>
          </div>
        ) : propostas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <Vote className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma proposta encontrada</h3>
            <p className="text-gray-400">Seja o primeiro a propor uma melhoria para Lambari!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {propostas.map((p, idx) => {
              const catInfo = getCategoriaInfo(p.categoria);
              return (
                <div key={p.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${catInfo.color}`}>
                        {catInfo.label}
                      </span>
                      {idx === 0 && (
                        <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          <Trophy className="h-3 w-3" /> Mais votada
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{p.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{p.descricao}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span>Por {p.autorNome}</span>
                      {p.bairro && <span>📍 {p.bairro}</span>}
                      {p.valorEstimado && (
                        <span>💰 R$ {Number(p.valorEstimado).toLocaleString("pt-BR")}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">{p.totalVotos}</span>
                        <span className="text-sm text-gray-500">votos</span>
                      </div>
                      {votingId === p.id ? (
                        <div className="flex flex-col gap-2">
                          <input placeholder="Seu nome" value={voteName} onChange={(e) => setVoteName(e.target.value)}
                            className="border rounded px-3 py-1.5 text-sm w-48" />
                          <input placeholder="Seu email" value={voteEmail} onChange={(e) => setVoteEmail(e.target.value)}
                            className="border rounded px-3 py-1.5 text-sm w-48" type="email" />
                          <div className="flex gap-2">
                            <button onClick={() => handleVote(p.id)}
                              className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700">
                              Confirmar
                            </button>
                            <button onClick={() => setVotingId(null)}
                              className="border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50">
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setVotingId(p.id)}
                          className="flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-xl hover:bg-blue-100 font-medium transition">
                          <Vote className="h-4 w-4" /> Votar (+5 pts)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
