"use client";

import React, { useState } from "react";
import { X, Eye, Volume2, Contrast, Type } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: "normal" | "large" | "larger";
  lineHeight: "normal" | "relaxed" | "loose";
  darkMode: boolean;
  dyslexiaFont: boolean;
}

interface AccessibilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccessibilityModal({ open, onOpenChange }: AccessibilityModalProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: "normal",
    lineHeight: "normal",
    darkMode: false,
    dyslexiaFont: false,
  });

  const handleToggle = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFontSizeChange = (size: "normal" | "large" | "larger") => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
    applyFontSize(size);
  };

  const handleLineHeightChange = (height: "normal" | "relaxed" | "loose") => {
    setSettings((prev) => ({ ...prev, lineHeight: height }));
    applyLineHeight(height);
  };

  const applyFontSize = (size: string) => {
    const root = document.documentElement;
    switch (size) {
      case "large":
        root.style.fontSize = "18px";
        break;
      case "larger":
        root.style.fontSize = "20px";
        break;
      default:
        root.style.fontSize = "16px";
    }
  };

  const applyLineHeight = (height: string) => {
    const root = document.documentElement;
    switch (height) {
      case "relaxed":
        root.style.lineHeight = "1.8";
        break;
      case "loose":
        root.style.lineHeight = "2.0";
        break;
      default:
        root.style.lineHeight = "1.5";
    }
  };

  const handleHighContrast = () => {
    handleToggle("highContrast");
    const isEnabled = !settings.highContrast;
    if (isEnabled) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  const handleDarkMode = () => {
    handleToggle("darkMode");
    const isEnabled = !settings.darkMode;
    if (isEnabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleDyslexiaFont = () => {
    handleToggle("dyslexiaFont");
    const isEnabled = !settings.dyslexiaFont;
    if (isEnabled) {
      document.documentElement.classList.add("dyslexia-font");
    } else {
      document.documentElement.classList.remove("dyslexia-font");
    }
  };

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      fontSize: "normal",
      lineHeight: "normal",
      darkMode: false,
      dyslexiaFont: false,
    });
    document.documentElement.classList.remove("high-contrast", "dark", "dyslexia-font");
    document.documentElement.style.fontSize = "16px";
    document.documentElement.style.lineHeight = "1.5";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg">
        <DialogHeader className="border-b-2 border-gray-200 dark:border-gray-700 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            Acessibilidade
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tamanho da Fonte */}
          <div className="border-b-2 border-gray-100 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">Tamanho da Fonte</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleFontSizeChange("normal")}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  settings.fontSize === "normal"
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400"
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => handleFontSizeChange("large")}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  settings.fontSize === "large"
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400"
                }`}
              >
                Grande
              </button>
              <button
                onClick={() => handleFontSizeChange("larger")}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  settings.fontSize === "larger"
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400"
                }`}
              >
                Maior
              </button>
            </div>
          </div>

          {/* Espaçamento de Linhas */}
          <div className="border-b-2 border-gray-100 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">Espaçamento de Linhas</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleLineHeightChange("normal")}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  settings.lineHeight === "normal"
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-400"
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => handleLineHeightChange("relaxed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  settings.lineHeight === "relaxed"
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-400"
                }`}
              >
                Relaxado
              </button>
              <button
                onClick={() => handleLineHeightChange("loose")}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  settings.lineHeight === "loose"
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-400"
                }`}
              >
                Solto
              </button>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-all">
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={handleHighContrast}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Contrast className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Alto Contraste</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Aumenta contraste entre elementos</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-all">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={handleDarkMode}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Modo Escuro</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reduz o brilho da tela</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-all">
              <input
                type="checkbox"
                checked={settings.dyslexiaFont}
                onChange={handleDyslexiaFont}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Fonte para Dislexia</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fonte otimizada para dislexia</p>
              </div>
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>Dica:</strong> Ajuste as opções acima para melhorar sua experiência de navegação no site.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 justify-between border-t-2 border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={resetSettings}
            className="px-4 py-2 rounded-lg border-2 border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-all"
          >
            Restaurar Padrão
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium border-2 border-blue-700 transition-all"
          >
            Fechar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
