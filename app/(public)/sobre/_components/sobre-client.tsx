"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Droplets, Mountain, Building, MapPin, Calendar, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SobreClientProps {
  config: any;
}

const fontes = [
  { nome: "Fonte Nº 1 - Gasosa", descricao: "Benéfica para rins, vesícula e tratamentos de pele" },
  { nome: "Fonte Nº 2 - Alcalina", descricao: "Indicada para problemas estomacais e intestinais" },
  { nome: "Fonte Nº 3 - Magnesiana", descricao: "Tratamento do fígado e congestões hepáticas" },
  { nome: "Fonte Nº 4 - Ligeiramente Gasosa", descricao: "Recomendada especialmente para crianças" },
  { nome: "Fonte Nº 5 - Ferruginosa", descricao: "Efeitos vasodilatadores e hipotensores" },
  { nome: "Fonte Nº 6 - Picante", descricao: "Diurética, indicada para intoxicações" }
];

const atrativos = [
  {
    nome: "Parque das Águas",
    descricao: "Principal atrativo com seis fontes de águas minerais terapêuticas",
    imagem: "https://i.ytimg.com/vi/kWCoXWkowYE/maxresdefault.jpg"
  },
  {
    nome: "Cassino do Lago",
    descricao: "Edifício histórico inaugurado em 1911, patrimônio cultural",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg/1280px-Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg"
  },
  {
    nome: "Lago Guanabara",
    descricao: "Lago com caldeirão de 5km, ideal para caminhadas e esportes náuticos",
    imagem: "https://live.staticflickr.com/5081/5195285274_6875ab4aff_b.jpg"
  },
  {
    nome: "Parque Florestal Nova Baden",
    descricao: "Reserva ecológica com trilhas e a Cachoeira Sete Quedas",
    imagem: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_I5HG86gWcxIo8GP9ozuNwS_3MyK4kXpqohfuFSVAnpDKmTFYFNMxpxPZxEjv-BrP_8c_NW_qnL5sDehqjdqiKOGBa24VLkWK4GTfr2bTql5t86cZzCN4FuhLTILlCFFkfWawxflUyibK/s1600/novabadem+lambari+josiane++%25282%2529.jpg"
  }
];

export function SobreClient({ config }: SobreClientProps) {
  return (
    <>
      {/* História */}
      <section id="historia" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                <Calendar className="inline w-8 h-8 mr-2 text-blue-600" />
                História de Lambari
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  A história de Lambari está intrinsecamente ligada à descoberta de suas águas minerais. Por volta de 1780, um rico fazendeiro chamado Antônio de Araújo Dantas possuía terras onde foram descobertas as "Águas Santas".
                </p>
                <p>
                  Segundo a lenda, uma menina doente chamada Cecília foi curada por essas águas, que passaram a ser conhecidas como "Águas Virtuosas". Em 1837, foi construída uma pequena capela e o povoado começou a prosperar.
                </p>
                <p>
                  O município foi oficialmente criado com o nome de "Águas Virtuosas" em 1911 e reconhecido como Estância Hidromineral em 1970. O queijo Catupiry foi inventado aqui em 1911 pelos imigrantes italianos Mário e Isaíra Silvestrini.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Lambari_MG_Brasil_-_Vista_da_Cidade_-_panoramio.jpg"
                alt="Vista histórica de Lambari"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fontes Minerais */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Droplets className="inline w-8 h-8 mr-2 text-blue-500" />
              As 6 Fontes Minerais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O Parque das Águas abriga seis fontes de águas minerais, cada uma com propriedades terapêuticas únicas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fontes.map((fonte, index) => (
              <motion.div
                key={fonte.nome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800">{fonte.nome}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{fonte.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Turismo */}
      <section id="turismo" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Mountain className="inline w-8 h-8 mr-2 text-blue-600" />
              Atrativos Turísticos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lambari oferece uma variedade de atrativos naturais e históricos para todos os gostos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {atrativos.map((atrativo, index) => (
              <motion.div
                key={atrativo.nome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-video relative">
                    <Image
                      src={atrativo.imagem}
                      alt={atrativo.nome}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{atrativo.nome}</h3>
                    <p className="text-gray-200 text-sm">{atrativo.descricao}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gestão */}
      <section id="gestao" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Users className="inline w-8 h-8 mr-2 text-blue-600" />
              Gestão Municipal 2025-2028
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Prefeito */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="text-center overflow-hidden">
                <div className="bg-blue-700 py-4">
                  <Award className="w-8 h-8 text-cyan-400 mx-auto" />
                  <p className="text-white font-medium">Prefeito Municipal</p>
                </div>
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-blue-200">
                    <Image
                      src={config?.fotoPrefeito ?? "https://cdn.abacus.ai/images/7b768035-68ae-4390-85c9-def7c95e7a47.png"}
                      alt="Prefeito"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{config?.prefeito ?? "Leonardo Framil"}</h3>
                  <p className="text-blue-600">Partido: UNIÃO</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vice */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="text-center overflow-hidden">
                <div className="bg-blue-600 py-4">
                  <Award className="w-8 h-8 text-cyan-300 mx-auto" />
                  <p className="text-white font-medium">Vice-Prefeito</p>
                </div>
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-blue-200 bg-gray-200 flex items-center justify-center">
                    <Users className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{config?.vicePrefeito ?? "Alex Rocha"}</h3>
                  <p className="text-blue-600">Partido: UNIÃO</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
