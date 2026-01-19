"use client";

import { useEffect } from "react";

export function VLibrasWidget() {
  useEffect(() => {
    // Carrega o script do VLibras
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      // Inicializa o VLibras quando o script estiver carregado
      if ((window as any).vlibras) {
        (window as any).vlibras.init({
          avatar: "maya",
          autoplay: false,
          mode: "window",
          lang: "pt-BR",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove o script quando o componente desmontar
      const existingScript = document.querySelector(
        'script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // O VLibras se renderiza como um widget flutuante automático
}
