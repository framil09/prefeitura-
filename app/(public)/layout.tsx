import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await prisma.configuracaoSite.findFirst();

  return (
    <div className="min-h-screen flex flex-col">
      <Header config={config} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer config={config} />
      <WhatsAppFloatingButton
        telefone={config?.telefone}
        nomeCidade={config?.nomeCidade}
      />
    </div>
  );
}
