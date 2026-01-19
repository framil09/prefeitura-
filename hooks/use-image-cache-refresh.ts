"use client";

import { useEffect } from "react";

/**
 * Hook que força o navegador a recarregar a imagem do cache
 * Útil para atualizar logos e banners em tempo real
 */
export function useImageCacheRefresh() {
  useEffect(() => {
    // Função para limpar cache de imagens
    const refreshImageCache = () => {
      // Recarrega todas as imagens da página forçando o navegador a buscar a versão mais recente
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        const src = img.src;
        img.src = src + `?t=${Date.now()}`; // Adiciona timestamp para forçar recarga
      });
    };

    // Listen para quando o documento sofrer mudanças
    const observer = new MutationObserver(() => {
      refreshImageCache();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["src"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
}

/**
 * Função para atualizar imagens dinamicamente
 */
export function refreshImageCache() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.src;
    if (src && !src.includes("?t=")) {
      img.src = src + `?t=${Date.now()}`;
    } else if (src) {
      const newSrc = src.split("?t=")[0];
      img.src = newSrc + `?t=${Date.now()}`;
    }
  });
}
