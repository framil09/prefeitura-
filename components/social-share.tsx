"use client";

import {
  Facebook,
  Twitter,
  Share2,
  MessageCircle,
  Linkedin,
  Mail,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface SocialShareProps {
  title: string;
  url: string;
  resumo?: string;
}

export function SocialShare({ title, url, resumo }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(resumo || title)}\n\n${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erro ao copiar:", error);
    }
  };

  const openShare = (socialUrl: string, target: string = "_blank") => {
    if (typeof window !== "undefined") {
      window.open(socialUrl, target, "width=600,height=400");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Facebook */}
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 text-blue-600 hover:bg-blue-50"
        title="Compartilhar no Facebook"
        onClick={() => openShare(shareLinks.facebook)}
      >
        <Facebook className="w-4 h-4" />
      </Button>

      {/* Twitter/X */}
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 text-black hover:bg-gray-100"
        title="Compartilhar no X (Twitter)"
        onClick={() => openShare(shareLinks.twitter)}
      >
        <Twitter className="w-4 h-4" />
      </Button>

      {/* WhatsApp */}
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 text-green-600 hover:bg-green-50"
        title="Compartilhar no WhatsApp"
        onClick={() => openShare(shareLinks.whatsapp)}
      >
        <MessageCircle className="w-4 h-4" />
      </Button>

      {/* LinkedIn */}
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 text-blue-700 hover:bg-blue-50"
        title="Compartilhar no LinkedIn"
        onClick={() => openShare(shareLinks.linkedin)}
      >
        <Linkedin className="w-4 h-4" />
      </Button>

      {/* Email */}
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 text-red-600 hover:bg-red-50"
        title="Enviar por Email"
        onClick={() => openShare(shareLinks.email, "_self")}
      >
        <Mail className="w-4 h-4" />
      </Button>

      {/* Copiar Link */}
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 hover:bg-gray-100"
        title="Copiar link"
        onClick={handleCopyLink}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
