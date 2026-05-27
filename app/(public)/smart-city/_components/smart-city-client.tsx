"use client";

import { useState, useEffect } from "react";
import {
  Cloud, Thermometer, Droplets, Wind, Users, Building2,
  Newspaper, FileText, TrendingUp, AlertTriangle, Activity,
  RefreshCw, Vote, Eye, MapPin, BarChart3, Shield, Heart
} from "lucide-react";

interface DashboardData {
  clima: {
    temperatura: string;
    condicao: string;
    umidade: string;
    sensacaoTermica?: string;
    vento?: string;
    fonte: string;
  };
  populacao: {
    populacao: string;
    anoRef: string;
    fonte: string;
  };
  indicadores: {
    totalSecretarias: number;
    totalNoticias: number;
    licitacoes: { total: number; abertas: number };
    emendas: { total: number; valorTotal: number; execucaoMedia: number };
    orcamentoParticipativo: { totalPropostas: number; totalVotos: number; totalCidadaos: number };
    protocolos: { total: number; abertos: number; finalizados: number };
  };
  alertas: Array<{
    id: string;
    tipo: string;
    titulo: string;
    descricao: string;
    severidade: string;
    createdAt: string;
  }>;
  atualizadoEm: string;
}

const SEVERIDADE_MAP: Record<string, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  danger: "bg-red-50 border-red-200 text-red-800",
};

export function SmartCityClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/smart-city");
      const json = await res.json();
      if (res.ok) setData(json);
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4" />
          <p className="text-cyan-300 text-lg">Carregando Smart City Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-red-400">Erro ao carregar dados do dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 p-2.5 rounded-xl">
              <Activity className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Lambari Smart City</h1>
              <p className="text-xs text-slate-400">Dashboard de Indicadores Municipais</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              Atualizado: {new Date(data.atualizadoEm).toLocaleString("pt-BR")}
            </span>
            <button
              onClick={() => fetchData(true)}
              className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm transition"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Alertas */}
        {data.alertas.length > 0 && (
          <div className="space-y-3">
            {data.alertas.map((alerta) => (
              <div key={alerta.id} className={`p-4 rounded-xl border ${SEVERIDADE_MAP[alerta.severidade] || SEVERIDADE_MAP.info}`}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-semibold text-sm">{alerta.titulo}</span>
                </div>
                <p className="text-sm opacity-80">{alerta.descricao}</p>
              </div>
            ))}
          </div>
        )}

        {/* Top row: Clima + População */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Clima Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur rounded-2xl border border-cyan-500/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-cyan-300">Clima Atual</h2>
              <span className="text-xs text-slate-500 ml-auto">Fonte: {data.clima.fonte}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Thermometer className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <p className="text-3xl font-bold">{data.clima.temperatura}</p>
                <p className="text-xs text-slate-400">Temperatura</p>
              </div>
              <div className="text-center">
                <Cloud className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-lg font-medium capitalize">{data.clima.condicao}</p>
                <p className="text-xs text-slate-400">Condição</p>
              </div>
              <div className="text-center">
                <Droplets className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-3xl font-bold">{data.clima.umidade}</p>
                <p className="text-xs text-slate-400">Umidade</p>
              </div>
              <div className="text-center">
                <Wind className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-3xl font-bold">{data.clima.vento || "N/A"}</p>
                <p className="text-xs text-slate-400">Vento</p>
              </div>
            </div>
          </div>

          {/* População */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur rounded-2xl border border-purple-500/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-purple-400" />
              <h2 className="font-semibold text-purple-300">População</h2>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-white">
                {Number(data.populacao.populacao).toLocaleString("pt-BR") || data.populacao.populacao}
              </p>
              <p className="text-sm text-slate-400 mt-1">habitantes ({data.populacao.anoRef})</p>
              <p className="text-xs text-slate-500 mt-2">Fonte: {data.populacao.fonte}</p>
            </div>
            <div className="flex items-center gap-2 justify-center mt-2">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Lambari - MG</span>
            </div>
          </div>
        </div>

        {/* Indicadores Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <IndicadorCard icon={Building2} label="Secretarias Ativas" value={data.indicadores.totalSecretarias} color="cyan" />
          <IndicadorCard icon={Newspaper} label="Notícias Publicadas" value={data.indicadores.totalNoticias} color="green" />
          <IndicadorCard icon={FileText} label="Licitações" value={data.indicadores.licitacoes.total}
            sub={`${data.indicadores.licitacoes.abertas} abertas`} color="yellow" />
          <IndicadorCard icon={TrendingUp} label="Emendas Impositivas" value={data.indicadores.emendas.total}
            sub={`R$ ${data.indicadores.emendas.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`} color="orange" />
        </div>

        {/* Participação e Protocolos */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Orçamento Participativo */}
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Vote className="h-5 w-5 text-blue-400" />
              <h2 className="font-semibold text-blue-300">Orçamento Participativo</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">{data.indicadores.orcamentoParticipativo.totalPropostas}</p>
                <p className="text-xs text-slate-400 mt-1">Propostas</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-400">{data.indicadores.orcamentoParticipativo.totalVotos}</p>
                <p className="text-xs text-slate-400 mt-1">Votos</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-purple-400">{data.indicadores.orcamentoParticipativo.totalCidadaos}</p>
                <p className="text-xs text-slate-400 mt-1">Cidadãos</p>
              </div>
            </div>
            <a href="/orcamento-participativo" className="block mt-4 text-center text-sm text-blue-400 hover:text-blue-300 transition">
              Participar →
            </a>
          </div>

          {/* Hub de Protocolos */}
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-indigo-400" />
              <h2 className="font-semibold text-indigo-300">Hub de Protocolos</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-indigo-400">{data.indicadores.protocolos.total}</p>
                <p className="text-xs text-slate-400 mt-1">Total</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-yellow-400">{data.indicadores.protocolos.abertos}</p>
                <p className="text-xs text-slate-400 mt-1">Em Andamento</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-400">{data.indicadores.protocolos.finalizados}</p>
                <p className="text-xs text-slate-400 mt-1">Finalizados</p>
              </div>
            </div>
            <a href="/protocolos" className="block mt-4 text-center text-sm text-indigo-400 hover:text-indigo-300 transition">
              Acessar Central →
            </a>
          </div>
        </div>

        {/* Emendas Progress */}
        {data.indicadores.emendas.total > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-orange-400" />
              <h2 className="font-semibold text-orange-300">Execução de Emendas Impositivas</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, data.indicadores.emendas.execucaoMedia)}%` }}
                />
              </div>
              <span className="text-lg font-bold text-orange-400">
                {Math.round(data.indicadores.emendas.execucaoMedia)}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Média de execução de {data.indicadores.emendas.total} emendas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function IndicadorCard({
  icon: Icon, label, value, sub, color,
}: {
  icon: any; label: string; value: number; sub?: string;
  color: "cyan" | "green" | "yellow" | "orange" | "blue" | "purple";
}) {
  const colorMap = {
    cyan: "from-cyan-600/20 to-cyan-800/20 border-cyan-500/20 text-cyan-400",
    green: "from-green-600/20 to-green-800/20 border-green-500/20 text-green-400",
    yellow: "from-yellow-600/20 to-yellow-800/20 border-yellow-500/20 text-yellow-400",
    orange: "from-orange-600/20 to-orange-800/20 border-orange-500/20 text-orange-400",
    blue: "from-blue-600/20 to-blue-800/20 border-blue-500/20 text-blue-400",
    purple: "from-purple-600/20 to-purple-800/20 border-purple-500/20 text-purple-400",
  };
  const c = colorMap[color];
  return (
    <div className={`bg-gradient-to-br ${c} backdrop-blur rounded-xl border p-5`}>
      <Icon className={`h-6 w-6 mb-3 ${c.split(" ").pop()}`} />
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}
