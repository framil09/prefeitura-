import { SmartCityClient } from "./_components/smart-city-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Smart City Dashboard | Prefeitura de Lambari",
  description: "Painel inteligente com indicadores urbanos e sociais de Lambari em tempo real.",
};

export default function SmartCityPage() {
  return <SmartCityClient />;
}
