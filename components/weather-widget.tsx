"use client";

import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, CloudSun, Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherData {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  rain: number;
}

const weatherIcons: Record<string, React.ReactNode> = {
  "Clear": <Sun className="w-8 h-8 text-yellow-400" />,
  "Sunny": <Sun className="w-8 h-8 text-yellow-400" />,
  "Partly cloudy": <CloudSun className="w-8 h-8 text-gray-400" />,
  "Cloudy": <Cloud className="w-8 h-8 text-gray-400" />,
  "Overcast": <Cloud className="w-8 h-8 text-gray-500" />,
  "Rain": <CloudRain className="w-8 h-8 text-blue-400" />,
  "Light rain": <CloudRain className="w-8 h-8 text-blue-300" />,
  "Heavy rain": <CloudRain className="w-8 h-8 text-blue-600" />,
  "Thunderstorm": <CloudRain className="w-8 h-8 text-purple-500" />,
};

export function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://wttr.in/Lambari,MG,Brazil?format=j1",
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        const current = data.current_condition[0];
        
        setWeather({
          temp: parseInt(current.temp_C),
          description: current.weatherDesc[0].value,
          humidity: parseInt(current.humidity),
          windSpeed: parseInt(current.windspeedKmph),
          icon: current.weatherDesc[0].value,
          rain: parseInt(current.precipMM) || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${compact ? "text-sm" : ""}`}>
        <div className="animate-pulse bg-blue-200 rounded w-16 h-4"></div>
      </div>
    );
  }

  if (error || !weather) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-white text-sm">
        {weatherIcons[weather.icon] || <Cloud className="w-4 h-4" />}
        <span className="font-medium">{weather.temp}°C</span>
        {weather.rain > 0 && (
          <span className="flex items-center gap-1 text-cyan-300">
            <Droplets className="w-3 h-3" />
            {weather.rain}mm
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 text-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-blue-200 uppercase tracking-wide">Lambari - MG</p>
          <p className="text-2xl font-bold">{weather.temp}°C</p>
        </div>
        <div className="text-right">
          {weatherIcons[weather.icon] || <Cloud className="w-10 h-10" />}
          <p className="text-xs mt-1 text-blue-200">{weather.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-2">
          <Droplets className="w-4 h-4 text-cyan-300" />
          <div>
            <p className="text-blue-200">Umidade</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-2">
          <Wind className="w-4 h-4 text-gray-300" />
          <div>
            <p className="text-blue-200">Vento</p>
            <p className="font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-2">
          <CloudRain className="w-4 h-4 text-blue-300" />
          <div>
            <p className="text-blue-200">Chuva</p>
            <p className="font-semibold">{weather.rain}mm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeatherWidgetLarge() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://wttr.in/Lambari,MG,Brazil?format=j1",
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        const current = data.current_condition[0];
        
        setWeather({
          temp: parseInt(current.temp_C),
          feelsLike: parseInt(current.FeelsLikeC),
          description: current.weatherDesc[0].value,
          humidity: parseInt(current.humidity),
          windSpeed: parseInt(current.windspeedKmph),
          icon: current.weatherDesc[0].value,
          rain: parseInt(current.precipMM) || 0,
          visibility: parseInt(current.visibility),
          uvIndex: parseInt(current.uvIndex),
        });
        
        const forecastData = data.weather.slice(0, 5).map((day: any) => ({
          date: day.date,
          maxTemp: parseInt(day.maxtempC),
          minTemp: parseInt(day.mintempC),
          description: day.hourly[4].weatherDesc[0].value,
          chanceOfRain: parseInt(day.hourly[4].chanceofrain),
        }));
        setForecast(forecastData);
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white animate-pulse">
        <div className="h-32 bg-white/20 rounded"></div>
      </div>
    );
  }

  if (!weather) return null;

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Hoje";
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return "Amanhã";
    return date.toLocaleDateString("pt-BR", { weekday: "short" });
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Clima em Lambari
          </h3>
          <p className="text-blue-200 text-sm">Estância Hidromineral</p>
        </div>
        <div className="text-right">
          {weatherIcons[weather.icon] || <Cloud className="w-12 h-12" />}
        </div>
      </div>

      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-5xl font-bold">{weather.temp}°C</p>
          <p className="text-blue-200">Sensação: {weather.feelsLike}°C</p>
          <p className="text-sm mt-1 capitalize">{weather.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Droplets className="w-5 h-5 mx-auto text-cyan-300 mb-1" />
            <p className="text-blue-200 text-xs">Umidade</p>
            <p className="font-bold">{weather.humidity}%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Wind className="w-5 h-5 mx-auto text-gray-300 mb-1" />
            <p className="text-blue-200 text-xs">Vento</p>
            <p className="font-bold">{weather.windSpeed}km/h</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <CloudRain className="w-5 h-5 mx-auto text-blue-300 mb-1" />
            <p className="text-blue-200 text-xs">Chuva</p>
            <p className="font-bold">{weather.rain}mm</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Sun className="w-5 h-5 mx-auto text-yellow-400 mb-1" />
            <p className="text-blue-200 text-xs">UV</p>
            <p className="font-bold">{weather.uvIndex}</p>
          </div>
        </div>
      </div>

      {/* Previsão */}
      <div className="border-t border-white/20 pt-4">
        <p className="text-sm text-blue-200 mb-3">Previsão para os próximos dias</p>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((day, idx) => (
            <div key={idx} className="text-center bg-white/5 rounded-lg p-2">
              <p className="text-xs text-blue-200">{getDayName(day.date)}</p>
              <div className="my-1">
                {day.chanceOfRain > 50 ? (
                  <CloudRain className="w-5 h-5 mx-auto text-blue-300" />
                ) : day.chanceOfRain > 20 ? (
                  <CloudSun className="w-5 h-5 mx-auto text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 mx-auto text-yellow-400" />
                )}
              </div>
              <p className="text-xs">
                <span className="font-bold">{day.maxTemp}°</span>
                <span className="text-blue-300"> {day.minTemp}°</span>
              </p>
              {day.chanceOfRain > 0 && (
                <p className="text-xs text-cyan-300 mt-1">
                  <Droplets className="w-3 h-3 inline" /> {day.chanceOfRain}%
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}