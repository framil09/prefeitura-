export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/sanitize";

/**
 * GET /api/smart-city
 * Dashboard Smart City com indicadores urbanos e sociais
 * Integra dados locais + APIs públicas (IBGE, OpenWeather)
 */

async function fetchWeatherData() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return {
      temperatura: "22°C",
      condicao: "Dados indisponíveis",
      umidade: "65%",
      fonte: "cache",
    };
  }
  try {
    // Lambari-MG coordinates: -21.9764, -45.3497
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=-21.9764&lon=-45.3497&appid=${apiKey}&units=metric&lang=pt_br`,
      { next: { revalidate: 1800 } } // Cache 30 min
    );
    if (res.ok) {
      const data = await res.json();
      return {
        temperatura: `${Math.round(data.main.temp)}°C`,
        condicao: data.weather[0]?.description || "N/A",
        umidade: `${data.main.humidity}%`,
        sensacaoTermica: `${Math.round(data.main.feels_like)}°C`,
        vento: `${data.wind.speed} km/h`,
        fonte: "OpenWeather",
      };
    }
  } catch (error) {
    console.error("Erro ao buscar clima:", error);
  }
  return {
    temperatura: "22°C",
    condicao: "Parcialmente nublado",
    umidade: "65%",
    fonte: "estimativa",
  };
}

async function fetchIBGEData() {
  try {
    // Lambari-MG - código IBGE: 3137304
    const res = await fetch(
      "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/-6/variaveis/9324?localidades=N6[3137304]",
      { next: { revalidate: 86400 } } // Cache 24h
    );
    if (res.ok) {
      const data = await res.json();
      // Extrair população estimada
      const resultados = data?.[0]?.resultados?.[0]?.series?.[0]?.serie;
      if (resultados) {
        const anos = Object.keys(resultados).sort().reverse();
        const populacao = resultados[anos[0]];
        return { populacao, anoRef: anos[0], fonte: "IBGE" };
      }
    }
  } catch (error) {
    console.error("Erro ao buscar dados IBGE:", error);
  }
  return { populacao: "~20.000", anoRef: "2022", fonte: "estimativa" };
}

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rateCheck = checkRateLimit(`smartcity:${ip}`, 30, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: "Muitas requisições" }, { status: 429 });
    }

    // Buscar dados em paralelo
    const [
      clima,
      ibge,
      indicadoresDB,
      alertasAtivos,
      totalLicitacoes,
      totalNoticias,
      totalSecretarias,
      licitacoesAbertas,
      emendas,
    ] = await Promise.all([
      fetchWeatherData(),
      fetchIBGEData(),
      prisma.indicadorSmartCity.findMany({ orderBy: { atualizadoEm: "desc" } }),
      prisma.alertaMunicipal.findMany({ where: { ativo: true }, orderBy: { createdAt: "desc" } }),
      prisma.licitacao.count(),
      prisma.noticia.count({ where: { publicado: true } }),
      prisma.secretaria.count({ where: { ativo: true } }),
      prisma.licitacao.count({ where: { status: "ABERTA" } }),
      prisma.emendaImpositiva.aggregate({
        where: { ativo: true },
        _sum: { valor: true },
        _avg: { percentualExecucao: true },
        _count: true,
      }),
    ]);

    // Indicadores do orçamento participativo
    let orcamentoParticipativo = { totalPropostas: 0, totalVotos: 0, totalCidadaos: 0 };
    try {
      const [propostas, votos, cidadaos] = await Promise.all([
        prisma.propostaOrcamentaria.count(),
        prisma.votoProposta.count(),
        prisma.cidadaoParticipante.count(),
      ]);
      orcamentoParticipativo = { totalPropostas: propostas, totalVotos: votos, totalCidadaos: cidadaos };
    } catch {
      // Tabelas podem não existir ainda
    }

    // Protocolos
    let protocolosStats = { total: 0, abertos: 0, finalizados: 0 };
    try {
      const [total, abertos, finalizados] = await Promise.all([
        prisma.protocolo.count(),
        prisma.protocolo.count({ where: { status: { in: ["ABERTO", "EM_ANALISE", "EM_TRAMITACAO"] } } }),
        prisma.protocolo.count({ where: { status: "FINALIZADO" } }),
      ]);
      protocolosStats = { total, abertos, finalizados };
    } catch {
      // Tabelas podem não existir ainda
    }

    const dashboard = {
      clima,
      populacao: ibge,
      indicadores: {
        totalSecretarias,
        totalNoticias,
        licitacoes: {
          total: totalLicitacoes,
          abertas: licitacoesAbertas,
        },
        emendas: {
          total: emendas._count,
          valorTotal: emendas._sum.valor ? Number(emendas._sum.valor) : 0,
          execucaoMedia: emendas._avg.percentualExecucao || 0,
        },
        orcamentoParticipativo,
        protocolos: protocolosStats,
      },
      indicadoresCustom: indicadoresDB,
      alertas: alertasAtivos,
      atualizadoEm: new Date().toISOString(),
    };

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error("Erro no smart city:", error);
    return NextResponse.json({ error: "Erro ao carregar dashboard" }, { status: 500 });
  }
}
