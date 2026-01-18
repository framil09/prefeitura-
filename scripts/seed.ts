import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");

  // Limpar dados existentes
  await prisma.noticia.deleteMany();
  await prisma.licitacao.deleteMany();
  await prisma.midia.deleteMany();
  await prisma.user.deleteMany();
  await prisma.secretaria.deleteMany();
  await prisma.configuracaoSite.deleteMany();

  // Configuração do Site
  await prisma.configuracaoSite.create({
    data: {
      nomeCidade: "Lambari",
      slogan: "Estância Hidromineral - Terra das Águas Virtuosas",
      telefone: "0800 035 4011",
      email: "contato@lambari.mg.gov.br",
      endereco: "Rua Tiradentes, 165 - Centro - Lambari/MG - CEP: 37.480-000",
      horarioAtendimento: "Segunda a Sexta: 8h às 17h",
      facebookUrl: "https://www.facebook.com/prefeituramunicipaldelambari",
      instagramUrl: "https://www.instagram.com/prefeituramunicipaldelambari",
      prefeito: "Leonardo Framil",
      fotoPrefeito: "https://cdn.abacus.ai/images/7b768035-68ae-4390-85c9-def7c95e7a47.png",
      vicePrefeito: "Alex Rocha"
    }
  });

  // Secretarias
  const secretarias = await Promise.all([
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Administração",
        sigla: "SEMAD",
        descricao: "Responsável pela gestão administrativa, recursos humanos, patrimônio e serviços gerais da Prefeitura.",
        secretario: "A definir",
        fotoSecretario: "https://cdn.abacus.ai/images/d743103e-c19e-4597-956a-d4e29e132f88.png",
        telefone: "(35) 3271-1233",
        email: "administracao@lambari.mg.gov.br",
        ordem: 1,
        ativo: true
      }
    }),
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Educação",
        sigla: "SEMED",
        descricao: "Coordena e supervisiona as políticas educacionais do município, incluindo escolas municipais, creches e programas educativos.",
        secretario: "A definir",
        fotoSecretario: "https://cdn.abacus.ai/images/a550d13d-c692-4b26-abe9-01ea75863d80.png",
        telefone: "(35) 3271-1234",
        email: "educacao@lambari.mg.gov.br",
        ordem: 2,
        ativo: true
      }
    }),
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Saúde",
        sigla: "SEMSAU",
        descricao: "Gerencia os serviços de saúde pública, unidades básicas de saúde, programas de prevenção e vigilância sanitária.",
        secretario: "A definir",
        telefone: "(35) 3271-1235",
        email: "saude@lambari.mg.gov.br",
        ordem: 3,
        ativo: true
      }
    }),
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Turismo e Cultura",
        sigla: "SEMTUR",
        descricao: "Promove o turismo local, eventos culturais e preservação do patrimônio histórico da Estância Hidromineral de Lambari.",
        secretario: "A definir",
        telefone: "(35) 3271-1236",
        email: "turismo@lambari.mg.gov.br",
        ordem: 4,
        ativo: true
      }
    }),
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Obras e Serviços Urbanos",
        sigla: "SEMOB",
        descricao: "Responsável por obras públicas, manutenção urbana, infraestrutura viária e serviços de limpeza pública.",
        secretario: "A definir",
        telefone: "(35) 3271-1237",
        email: "obras@lambari.mg.gov.br",
        ordem: 5,
        ativo: true
      }
    }),
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Assistência Social",
        sigla: "SEMAS",
        descricao: "Coordena políticas de assistência social, programas de transferência de renda e atendimento à população vulnerável.",
        secretario: "A definir",
        telefone: "(35) 3271-1238",
        email: "social@lambari.mg.gov.br",
        ordem: 6,
        ativo: true
      }
    }),
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Fazenda",
        sigla: "SEMFAZ",
        descricao: "Gerencia as finanças municipais, arrecadação de tributos, contabilidade e orçamento público.",
        secretario: "A definir",
        telefone: "(35) 3271-1239",
        email: "fazenda@lambari.mg.gov.br",
        ordem: 7,
        ativo: true
      }
    }),
    prisma.secretaria.create({
      data: {
        nome: "Secretaria de Agricultura e Meio Ambiente",
        sigla: "SEMAMA",
        descricao: "Fomenta a agricultura familiar, desenvolvimento rural sustentável e preservação ambiental.",
        secretario: "A definir",
        telefone: "(35) 3271-1240",
        email: "agricultura@lambari.mg.gov.br",
        ordem: 8,
        ativo: true
      }
    })
  ]);

  // Usuários
  const hashedPassword = await bcrypt.hash("johndoe123", 10);
  const hashedAdminPassword = await bcrypt.hash("lambari2025", 10);

  await prisma.user.create({
    data: {
      email: "john@doe.com",
      password: hashedPassword,
      name: "John Doe",
      role: "ADMIN"
    }
  });

  await prisma.user.create({
    data: {
      email: "admin@lambari.mg.gov.br",
      password: hashedAdminPassword,
      name: "Administrador",
      role: "ADMIN"
    }
  });

  // Notícias
  await prisma.noticia.createMany({
    data: [
      {
        titulo: "Prefeitura anuncia novos investimentos no Parque das Águas",
        resumo: "Obras de revitalização vão modernizar as fontes minerais e infraestrutura turística do principal cartão postal de Lambari.",
        conteudo: "A Prefeitura Municipal de Lambari anunciou um amplo projeto de revitalização do Parque das Águas, principal atrativo turístico da Estância Hidromineral. O investimento inclui melhorias nas seis fontes de águas minerais, reforma das piscinas térmicas, nova iluminação e paisagismo. As obras têm previsão de início para o primeiro semestre de 2025 e devem beneficiar tanto moradores quanto turistas que visitam a cidade em busca dos benefícios das águas medicinais.",
        imagemCapa: "https://i.ytimg.com/vi/kWCoXWkowYE/maxresdefault.jpg",
        destaque: true,
        publicado: true,
        secretariaId: secretarias[3].id
      },
      {
        titulo: "Programa de Matrículas 2025 inicia em janeiro",
        resumo: "Secretaria de Educação divulga calendário de matrículas para a rede municipal de ensino.",
        conteudo: "A Secretaria Municipal de Educação de Lambari divulgou o calendário oficial de matrículas para o ano letivo de 2025. As inscrições para a Educação Infantil e Ensino Fundamental terão início na primeira semana de janeiro. Os pais e responsáveis devem comparecer às escolas municipais portando documentos do aluno e comprovante de residência. A rede municipal oferece ensino de qualidade com merenda escolar balanceada e transporte gratuito para alunos da zona rural.",
        imagemCapa: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Lambari_MG_Brasil_-_Vista_da_Cidade_-_panoramio.jpg",
        destaque: true,
        publicado: true,
        secretariaId: secretarias[1].id
      },
      {
        titulo: "Campanha de Vacinação contra Gripe começa em março",
        resumo: "Secretaria de Saúde prepara postos para imunização de grupos prioritários.",
        conteudo: "A Secretaria Municipal de Saúde de Lambari já está organizando a logística para a Campanha Nacional de Vacinação contra a Gripe 2025. Os grupos prioritários incluem idosos acima de 60 anos, crianças de 6 meses a 5 anos, gestantes, profissionais de saúde e portadores de doenças crônicas. A vacinação ocorrerá em todas as Unidades Básicas de Saúde do município, com horário estendido para facilitar o acesso da população.",
        imagemCapa: "https://live.staticflickr.com/5081/5195285274_6875ab4aff_b.jpg",
        destaque: false,
        publicado: true,
        secretariaId: secretarias[2].id
      },
      {
        titulo: "Festival de Inverno de Lambari terá programação especial",
        resumo: "Evento tradicional vai reunir artistas locais e atrações nacionais em julho.",
        conteudo: "O tradicional Festival de Inverno de Lambari promete ser um dos mais completos da região Sul de Minas em 2025. A Secretaria de Turismo e Cultura está finalizando a programação que incluirá shows musicais, apresentações teatrais, feira de artesanato e gastronomia regional. O evento acontece durante o mês de julho, aproveitando o clima agradável da Estância Hidromineral e atraindo turistas de todo o país.",
        imagemCapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg/1280px-Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg",
        destaque: true,
        publicado: true,
        secretariaId: secretarias[3].id
      }
    ]
  });

  // Licitações
  await prisma.licitacao.createMany({
    data: [
      {
        numero: "001/2025",
        modalidade: "Pregão Eletrônico",
        objeto: "Aquisição de materiais de escritório e expediente para as secretarias municipais de Lambari.",
        valorEstimado: 85000.00,
        dataAbertura: new Date("2025-02-15T09:00:00"),
        status: "ABERTA",
        secretariaId: secretarias[0].id
      },
      {
        numero: "002/2025",
        modalidade: "Tomada de Preços",
        objeto: "Contratação de empresa para reforma e manutenção das escolas municipais.",
        valorEstimado: 450000.00,
        dataAbertura: new Date("2025-02-20T14:00:00"),
        status: "ABERTA",
        secretariaId: secretarias[1].id
      },
      {
        numero: "003/2025",
        modalidade: "Pregão Presencial",
        objeto: "Aquisição de medicamentos e insumos para as Unidades Básicas de Saúde.",
        valorEstimado: 320000.00,
        dataAbertura: new Date("2025-01-25T10:00:00"),
        status: "EM_ANDAMENTO",
        secretariaId: secretarias[2].id
      },
      {
        numero: "004/2025",
        modalidade: "Concorrência Pública",
        objeto: "Obras de pavimentação asfáltica em vias urbanas do município de Lambari.",
        valorEstimado: 1200000.00,
        dataAbertura: new Date("2025-03-10T09:00:00"),
        status: "ABERTA",
        secretariaId: secretarias[4].id
      }
    ]
  });

  // Mídias (Galeria)
  await prisma.midia.createMany({
    data: [
      {
        titulo: "Parque das Águas - Vista Geral",
        descricao: "Vista panorâmica do Parque das Águas de Lambari com suas fontes minerais",
        tipo: "FOTO",
        url: "https://i.ytimg.com/vi/kWCoXWkowYE/maxresdefault.jpg",
        destaque: true
      },
      {
        titulo: "Cassino do Lago",
        descricao: "Palácio do Cassino do Lago, patrimônio histórico de Lambari inaugurado em 1911",
        tipo: "FOTO",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg/1280px-Pal%C3%A1cio_do_Cassino_do_Lago_-_Lambari-MG.jpg",
        destaque: true
      },
      {
        titulo: "Lago Guanabara",
        descricao: "Bela vista do Lago Guanabara com seu caldeirão de 5km ideal para caminhadas",
        tipo: "FOTO",
        url: "https://live.staticflickr.com/5081/5195285274_6875ab4aff_b.jpg",
        destaque: true
      },
      {
        titulo: "Farol de Lambari",
        descricao: "Fonte Luminosa no centro da cidade, construída em 1947",
        tipo: "FOTO",
        url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Lambari_MG_Brasil_-_Farol_-_panoramio.jpg",
        destaque: false
      },
      {
        titulo: "Cachoeira Sete Quedas",
        descricao: "Cachoeira no Parque Florestal Estadual de Nova Baden",
        tipo: "FOTO",
        url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_I5HG86gWcxIo8GP9ozuNwS_3MyK4kXpqohfuFSVAnpDKmTFYFNMxpxPZxEjv-BrP_8c_NW_qnL5sDehqjdqiKOGBa24VLkWK4GTfr2bTql5t86cZzCN4FuhLTILlCFFkfWawxflUyibK/s1600/novabadem+lambari+josiane++%25282%2529.jpg",
        destaque: false
      },
      {
        titulo: "Vista Aérea de Lambari",
        descricao: "Vista panorâmica aérea da cidade de Lambari",
        tipo: "FOTO",
        url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Lambari_MG_Brasil_-_Vista_da_Cidade_-_panoramio.jpg",
        destaque: true
      },
      {
        titulo: "Parque Wenceslau Braz",
        descricao: "Parque Novo com lago, piscinas e áreas de lazer",
        tipo: "FOTO",
        url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZNC_3cj-cHEGDuBmvXI8hQEpNuIfM7jtUkydBxlhgzdWZS5fb8zxkzKCLcVv4UQ8KeVDdgK1d37xEu2_7X8FWsRkcRP1cJNNoRXTBB_OK5XT8E7admwy5mTwl02xMEXoDaUJKMq5tzJw/s1600/2.JPG",
        destaque: false
      },
      {
        titulo: "Serra das Águas Virtuosas",
        descricao: "Vista da Serra a 1300m de altitude com vista panorâmica de Lambari",
        tipo: "FOTO",
        url: "https://i.ytimg.com/vi/lp4nOtXmih4/maxresdefault.jpg",
        destaque: false
      }
    ]
  });

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
