import { Metadata } from "next";
import TransparenciaPublicClient from "./_components/transparencia-public-client";

export const metadata: Metadata = {
  title: "Portal da Transparência - Prefeitura de Lambari",
  description:
    "Portal de Transparência da Prefeitura Municipal de Lambari - Acesso a informações públicas, orçamento, gastos e dados municipais",
};

export default async function TransparenciaPage() {
  return <TransparenciaPublicClient />;
}
