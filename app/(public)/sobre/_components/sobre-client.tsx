"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Droplets, Mountain, Building, MapPin, Calendar, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface SobreClientProps {
  prefeitos: any[];
  config: any;
}

interface Prefeito {
  id: string;
  nome: string;
  foto?: string;
  ano_inicio: number;
  ano_fim?: number;
  descricao?: string;
  partido?: string;
  destaque: boolean;
}

interface AtrativoTuristico {
  id: string;
  nome: string;
  descricao?: string;
  imagem?: string;
  categoria: string;
  ordem: number;
  ativo: boolean;
}

interface FonteMuneral {
  id: string;
  nome: string;
  descricao?: string;
  propriedades?: string;
  ordem: number;
  ativo: boolean;
}

// Dados padrão caso a API não retorne dados
const fontesDefault = [
  { id: "1", nome: "Fonte Nº 1 - Gasosa", descricao: "Benéfica para rins, vesícula e tratamentos de pele", propriedades: "", ordem: 1, ativo: true },
  { id: "2", nome: "Fonte Nº 2 - Alcalina", descricao: "Indicada para problemas estomacais e intestinais", propriedades: "", ordem: 2, ativo: true },
  { id: "3", nome: "Fonte Nº 3 - Magnesiana", descricao: "Tratamento do fígado e congestões hepáticas", propriedades: "", ordem: 3, ativo: true },
  { id: "4", nome: "Fonte Nº 4 - Ligeiramente Gasosa", descricao: "Recomendada especialmente para crianças", propriedades: "", ordem: 4, ativo: true },
  { id: "5", nome: "Fonte Nº 5 - Ferruginosa", descricao: "Efeitos vasodilatadores e hipotensores", propriedades: "", ordem: 5, ativo: true },
  { id: "6", nome: "Fonte Nº 6 - Picante", descricao: "Diurética, indicada para intoxicações", propriedades: "", ordem: 6, ativo: true }
];

const atrativosDefault = [
  {
    id: "1",
    nome: "Parque das Águas",
    descricao: "Principal atrativo com seis fontes de águas minerais terapêuticas",
    imagem: "https://i.ytimg.com/vi/kWCoXWkowYE/maxresdefault.jpg",
    categoria: "parque",
    ordem: 1,
    ativo: true
  },
  {
    id: "2",
    nome: "Cassino do Lago",
    descricao: "Edifício histórico inaugurado em 1911, patrimônio cultural",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg/1280px-Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg",
    categoria: "cassino",
    ordem: 2,
    ativo: true
  },
  {
    id: "3",
    nome: "Lago Guanabara",
    descricao: "Lago com caldeirão de 5km, ideal para caminhadas e esportes náuticos",
    imagem: "https://live.staticflickr.com/5081/5195285274_6875ab4aff_b.jpg",
    categoria: "lago",
    ordem: 3,
    ativo: true
  },
  {
    id: "4",
    nome: "Parque Florestal Nova Baden",
    descricao: "Reserva ecológica com trilhas e a Cachoeira Sete Quedas",
    imagem: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_I5HG86gWcxIo8GP9ozuNwS_3MyK4kXpqohfuFSVAnpDKmTFYFNMxpxPZxEjv-BrP_8c_NW_qnL5sDehqjdqiKOGBa24VLkWK4GTfr2bTql5t86cZzCN4FuhLTILlCFFkfWawxflUyibK/s1600/novabadem+lambari+josiane++%25282%2529.jpg",
    categoria: "floresta",
    ordem: 4,
    ativo: true
  }
];

export function SobreClient({ config, prefeitos }: SobreClientProps) {
  const [prefeitosAPI, setPrefeitosAPI] = useState<Prefeito[]>([]);
  const [atrativosAPI, setAtrativosAPI] = useState<AtrativoTuristico[]>(atrativosDefault);
  const [fontesAPI, setFontesAPI] = useState<FonteMuneral[]>(fontesDefault);
  const [loading, setLoading] = useState(true);

  // Dados padrão caso a API retorne vazia
  const prefeitosDefault = [
    { id: "1", nome: "Dr Eustáchio Garção Stockler", ano_inicio: 1902, destaque: false },
    { id: "2", nome: "Dr Américo Werneck", ano_inicio: 1907, destaque: true },
    { id: "3", nome: "Raul Noronha de Sá", ano_inicio: 1911, destaque: false },
    { id: "4", nome: "Dr. Antonio Pimentel Junior", ano_inicio: 1913, destaque: false },
    { id: "5", nome: "Henrique Cabral", ano_inicio: 1914, destaque: false },
    { id: "6", nome: "Francisco de Castro Filho", ano_inicio: 1918, destaque: false },
    { id: "7", nome: "Dr. Raul Franco de Almeida", ano_inicio: 1919, destaque: false },
    { id: "8", nome: "Affonso de Paiva Vilhena", ano_inicio: 1920, destaque: false },
    { id: "9", nome: "João de Almeida Lisboa", ano_inicio: 1921, destaque: false },
    { id: "10", nome: "Messias Silveira Machado", ano_inicio: 1921, destaque: false },
    { id: "11", nome: "Joaquim Figueira da Costa Cruz", ano_inicio: 1923, destaque: false },
    { id: "12", nome: "Júlio Bráulio", ano_inicio: 1924, destaque: false },
    { id: "13", nome: "Bernardo José de Paulo Aroeira", ano_inicio: 1924, destaque: false },
    { id: "14", nome: "Eurico Leopoldo de Bulhões Dutra", ano_inicio: 1930, destaque: false },
    { id: "15", nome: "Ernesto de Mello", ano_inicio: 1931, destaque: false },
    { id: "16", nome: "Luiz Lisboa", ano_inicio: 1932, destaque: false },
    { id: "17", nome: "Dr. João Lisboa Júnior", ano_inicio: 1935, ano_fim: 1945, destaque: false },
    { id: "18", nome: "Dr. Felix Geraldo de A. e Silva", ano_inicio: 1945, destaque: false },
    { id: "19", nome: "Dr. João Lisboa Júnior", ano_inicio: 1946, destaque: false },
    { id: "20", nome: "Dr. Helio Monteiro de Toledo Salles", ano_inicio: 1947, destaque: false },
    { id: "21", nome: "Dr Ural Prazeres", ano_inicio: 1947, destaque: false },
    { id: "22", nome: "Dr. Helio Monteiro de Toledo Salles", ano_inicio: 1947, ano_fim: 1950, destaque: false },
    { id: "23", nome: "Dr. João Lisboa Júnior", ano_inicio: 1951, ano_fim: 1954, destaque: false },
    { id: "24", nome: "José Horton de Morais", ano_inicio: 1952, destaque: false },
    { id: "25", nome: "José Capistrano", ano_inicio: 1955, destaque: false },
    { id: "26", nome: "Jairo Ferreira", ano_inicio: 1967, destaque: false },
    { id: "27", nome: "Dr. José Vicente da Câmara L. de Vilhena", ano_inicio: 1967, destaque: false },
    { id: "28", nome: "Professor Walter Cordeiro", ano_inicio: 1972, destaque: false },
    { id: "29", nome: "Dr. José Vicente L. de Vilhena", ano_inicio: 1973, destaque: false },
    { id: "30", nome: "Dr. Cyro Rodrigues Coelho", ano_inicio: 1973, destaque: false },
    { id: "31", nome: "José Carlos de Alcântara", ano_inicio: 1973, destaque: false },
    { id: "32", nome: "Dr. José Vicente L. de Vilhena", ano_inicio: 1976, destaque: false },
    { id: "33", nome: "Renato Nascimento", ano_inicio: 1983, destaque: false },
    { id: "34", nome: "Dr. Marcílio Marques Botti", ano_inicio: 1988, destaque: false },
    { id: "35", nome: "Eugênio Carneiro Rodrigues", ano_inicio: 1989, destaque: false },
    { id: "36", nome: "Sebastião Carlos dos Reis", ano_inicio: 1993, destaque: false },
    { id: "37", nome: "Eugênio Carneiro Rodrigues", ano_inicio: 1997, destaque: false },
    { id: "38", nome: "Nely Fernandes Arantes Bahia", ano_inicio: 2001, destaque: false },
    { id: "39", nome: "Sebastião Carlos dos Reis", ano_inicio: 2005, destaque: false },
    { id: "40", nome: "Marco Antônio de Resende", ano_inicio: 2009, destaque: false },
    { id: "41", nome: "Sérgio Teixeira", ano_inicio: 2013, ano_fim: 2020, destaque: false },
    { id: "42", nome: "Marcelo Giovani de Sousa", ano_inicio: 2021, ano_fim: 2024, destaque: false }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar prefeitos
        try {
          const prefeitosResponse = await fetch("/api/prefeitosapi");
          if (prefeitosResponse.ok) {
            const prefeitosData = await prefeitosResponse.json();
            setPrefeitosAPI(prefeitosData.length > 0 ? prefeitosData : prefeitosDefault);
          } else {
            setPrefeitosAPI(prefeitosDefault);
          }
        } catch {
          setPrefeitosAPI(prefeitosDefault);
        }

        // Buscar atrativos turísticos
        try {
          const atrativosResponse = await fetch("/api/turismo/atrativos");
          if (atrativosResponse.ok) {
            const atrativosData = await atrativosResponse.json();
            // Filtrar apenas ativos e ordenar por ordem
            const atativosAtivos = atrativosData
              .filter((a: AtrativoTuristico) => a.ativo)
              .sort((a: AtrativoTuristico, b: AtrativoTuristico) => a.ordem - b.ordem);
            setAtrativosAPI(atativosAtivos.length > 0 ? atativosAtivos : atrativosDefault);
          } else {
            setAtrativosAPI(atrativosDefault);
          }
        } catch {
          setAtrativosAPI(atrativosDefault);
        }

        // Buscar fontes minerais
        try {
          const fontesResponse = await fetch("/api/turismo/fontes");
          if (fontesResponse.ok) {
            const fontesData = await fontesResponse.json();
            // Filtrar apenas ativas e ordenar por ordem
            const fontesAtivas = fontesData
              .filter((f: FonteMuneral) => f.ativo)
              .sort((a: FonteMuneral, b: FonteMuneral) => a.ordem - b.ordem);
            setFontesAPI(fontesAtivas.length > 0 ? fontesAtivas : fontesDefault);
          } else {
            setFontesAPI(fontesDefault);
          }
        } catch {
          setFontesAPI(fontesDefault);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {fontesAPI.map((fonte, index) => (
              <motion.div
                key={fonte.id}
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
            {atrativosAPI.map((atrativo, index) => (
              <motion.div
                key={atrativo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-video relative bg-gray-200">
                    {atrativo.imagem && (
                      <Image
                        src={atrativo.imagem}
                        alt={atrativo.nome}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
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
            <p className="text-gray-600">Conheça os gestores atuais e histórico de prefeitos de Lambari</p>
          </motion.div>

          {/* Gestão Atual - Com Ênfase */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Administração Atual</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {/* Prefeito - Destacado */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="text-center overflow-hidden shadow-xl ring-2 ring-blue-400">
                  <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-4">
                    <Award className="w-8 h-8 text-yellow-300 mx-auto mb-1" />
                    <p className="text-white font-bold text-lg">Prefeito Municipal</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-blue-300 shadow-lg">
                      <Image
                        src={config?.fotoPrefeito ?? "https://cdn.abacus.ai/images/7b768035-68ae-4390-85c9-def7c95e7a47.png"}
                        alt="Prefeito"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{config?.prefeito ?? "Leonardo Framil"}</h3>
                    <p className="text-blue-600 font-semibold text-lg">Partido: UNIÃO</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">Mandato 2025-2028</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Vice - Destacado */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="text-center overflow-hidden shadow-xl ring-2 ring-cyan-400">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-4">
                    <Award className="w-8 h-8 text-yellow-200 mx-auto mb-1" />
                    <p className="text-white font-bold text-lg">Vice-Prefeito</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-cyan-300 shadow-lg">
                      {config?.fotoVicePrefeito ? (
                        <Image
                          src={config.fotoVicePrefeito}
                          alt="Vice-Prefeito"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                          <Users className="w-20 h-20 text-cyan-500" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{config?.vicePrefeito ?? "Alex Rocha"}</h3>
                    <p className="text-blue-600 font-semibold text-lg">Partido: UNIÃO</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">Mandato 2025-2028</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Histórico de Prefeitos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t-2 border-blue-200"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Histórico de Prefeitos</h3>
              <p className="text-gray-600">Gestores que passaram pela administração municipal de Lambari</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {prefeitos.sort((a, b) => a.ano_inicio - b.ano_inicio).map((prefeito, index) => (
                <motion.div
                  key={prefeito.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                  className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                    prefeito.destaque ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-white' : 'bg-white'
                  }`}
                >
                  <div className="aspect-square relative bg-gray-100 flex items-center justify-center overflow-hidden">
                    {prefeito.foto ? (
                      <Image
                        src={prefeito.foto}
                        alt={prefeito.nome}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-white font-bold text-6xl ${
                        prefeito.destaque ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'
                      }`}>
                        {prefeito.nome.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <p className={`font-bold text-gray-800 text-sm leading-tight ${prefeito.destaque ? 'text-yellow-700' : ''}`}>
                      {prefeito.nome}
                    </p>
                    {prefeito.destaque && (
                      <p className="text-xs text-yellow-600 font-semibold mt-1">★ 1º Nomeado</p>
                    )}
                    {prefeito.partido && (
                      <p className="text-xs text-gray-600 mt-1">Partido: {prefeito.partido}</p>
                    )}
                    <p className="text-xs text-blue-600 font-semibold border-t pt-2 mt-2">
                      {prefeito.ano_fim ? `${prefeito.ano_inicio}-${prefeito.ano_fim}` : prefeito.ano_inicio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
