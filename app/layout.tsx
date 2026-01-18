import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Prefeitura Municipal de Lambari - MG",
  description: "Portal oficial da Prefeitura Municipal de Lambari, Estância Hidromineral no Sul de Minas Gerais. Acesse serviços, notícias e informações sobre a cidade.",
  keywords: ["Lambari", "Prefeitura", "Minas Gerais", "Estância Hidromineral", "Parque das Águas"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  },
  openGraph: {
    title: "Prefeitura Municipal de Lambari - MG",
    description: "Portal oficial da Prefeitura Municipal de Lambari, Estância Hidromineral",
    images: ["/og-image.png"]
  }
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
