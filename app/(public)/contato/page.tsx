import { ContatoClient } from "./_components/contato-client";

export const dynamic = "force-dynamic";

export default function ContatoPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Ouvidoria e Atendimento</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Sua voz é importante! Entre em contato conosco.
          </p>
        </div>
      </section>

      <ContatoClient />
    </div>
  );
}

