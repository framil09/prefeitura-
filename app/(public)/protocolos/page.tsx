import { ProtocolosClient } from "./_components/protocolos-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hub de Protocolos | Prefeitura de Lambari",
  description: "Abra e acompanhe protocolos de serviços municipais com rastreamento em tempo real.",
};

export default function ProtocolosPage() {
  return <ProtocolosClient />;
}
