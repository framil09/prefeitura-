import { OrcamentoParticipativoClient } from "./_components/orcamento-participativo-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Orçamento Participativo | Prefeitura de Lambari",
  description: "Participe das decisões do município! Proponha e vote em projetos para Lambari.",
};

export default function OrcamentoParticipativoPage() {
  return <OrcamentoParticipativoClient />;
}
