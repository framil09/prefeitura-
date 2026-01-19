"use client";

import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, CloudSun, Droplets, Wind, Thermometer, RefreshCw } from "lucide-react";

interface WeatherData {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  rain: number;
}

const weatherIcons: Record<string, React.ReactNode> = {
  "Clear": <Sun className="w-12 h-12 text-yellow-400" />,
  "Sunny": <Sun className="w-12 h-12 text-yellow-400" />,
  "Partly cloudy": <CloudSun className="w-12 h-12 text-gray-300" />,
  "Cloudy": <Cloud className="w-12 h-12 text-gray-300" />,
  "Overcast": <Cloud className="w-12 h-12 text-gray-400" />,
  "Rain": <CloudRain className="w-12 h-12 text-blue-300" />,
  "Light rain": <CloudRain className="w-12 h-12 text-blue-200" />,
  "Heavy rain": <CloudRain className="w-12 h-12 text-blue-400" />,
  "Thunderstorm": <CloudRain className="w-12 h-12 text-purple-400" />,
};

// Skeleton Loader Component
function TemperatureSkeletonLoader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
        {/* Temperatura Skeleton */}
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white/20 rounded-lg animate-pulse"></div>
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-white/20 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-white/20 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-20 border-l border-white/30"></div>

        {/* Detalhes Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-16 bg-white/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function TemperatureWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWeather = async (isRefresh = false) => {
    try {
      if (isRefresh) setIsRefreshing(true);
      else setLoading(true);
      
      setError(null);

      // Usar cache se disponível
      const cachedData = sessionStorage.getItem('weather_lambari');
      const cachedTime = sessionStorage.getItem('weather_lambari_time');
      const now = Date.now();

      // Se há cache e foi atualizado há menos de 10 minutos, usar cache
      if (cachedData && cachedTime && now - parseInt(cachedTime) < 600000) {
        setWeather(JSON.parse(cachedData));
        setLoading(false);
        setIsRefreshing(false);
        return;
      }

      const response = await fetch(
        "https://wttr.in/Lambari,MG,Brazil?format=j1",
        { 
          cache: "no-store",
          signal: AbortSignal.timeout(10000) // Timeout de 10 segundos
        }
      );
      
      if (!response.ok) throw new Error("Serviço de clima indisponível");
      
      const data = await response.json();
      const current = data.current_condition[0];
      
      const weatherData: WeatherData = {
        temp: Math.round(parseFloat(current.temp_C)),
        description: current.weatherDesc[0].value,
        humidity: parseInt(current.humidity),
        windSpeed: Math.round(parseFloat(current.windspeedKmph)),
        icon: current.weatherDesc[0].value,
        rain: Math.round(parseFloat(current.precipMM)) || 0,
      };

      setWeather(weatherData);
      
      // Cachear dados
      sessionStorage.setItem('weather_lambari', JSON.stringify(weatherData));
      sessionStorage.setItem('weather_lambari_time', now.toString());
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao carregar temperatura";
      setError(errorMsg);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Carregar dados iniciais
    fetchWeather();

    // Atualizar a cada 30 minutos
    const interval = setInterval(() => fetchWeather(true), 1800000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <TemperatureSkeletonLoader />;
  }

  if (error || !weather) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center shadow-lg">
        <p className="mb-4">⚠️ Não foi possível carregar a temperatura</p>
        <button
          onClick={() => fetchWeather(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
        {/* Temperatura Principal */}
        <div className="flex items-center gap-6">
          <div className="relative">
            {weatherIcons[weather.icon] || <Sun className="w-12 h-12 text-yellow-400" />}
          </div>
          <div>
            <p className="text-white/90 text-sm font-medium uppercase tracking-wide">Lambari - MG</p>
            <p className="text-white text-5xl font-bold mt-1">{weather.temp}°</p>
            <p className="text-blue-100 text-sm mt-1 line-clamp-1">{weather.description}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-20 border-l border-white/30"></div>

        {/* Detalhes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/15 transition-colors">
            <Droplets className="w-5 h-5 text-blue-200 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-blue-100 text-xs font-medium">Umidade</p>
              <p className="text-white font-bold text-lg">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/15 transition-colors">
            <Wind className="w-5 h-5 text-blue-200 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-blue-100 text-xs font-medium">Vento</p>
              <p className="text-white font-bold text-lg">{weather.windSpeed}km/h</p>
            </div>
          </div>
        </div>

        {/* Botão de atualizar */}
        <div className="sm:absolute sm:top-4 sm:right-4">
          <button
            onClick={() => fetchWeather(true)}
            disabled={isRefreshing}
            className={`p-2 rounded-lg transition-all ${
              isRefreshing 
                ? 'bg-white/20 animate-spin' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            title="Atualizar temperatura"
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
