import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando criação de notícias...');

  // Criar um usuário padrão se não existir
  let user = await prisma.user.findFirst({
    where: { email: 'editor@lambari.gov.br' }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'editor@lambari.gov.br',
        name: 'Editor Padrão',
        password: 'senha123', // Em produção, usar hash bcrypt
        role: 'EDITOR'
      }
    });
    console.log('✓ Usuário criado:', user.email);
  }

  // Criar secretarias padrão se não existirem
  let secretariaEducacao = await prisma.secretaria.findFirst({
    where: { nome: 'Secretaria de Educação' }
  });

  if (!secretariaEducacao) {
    secretariaEducacao = await prisma.secretaria.create({
      data: {
        nome: 'Secretaria de Educação',
        sigla: 'SEDU',
        descricao: 'Responsável pela educação municipal',
        telefone: '(35) 3343-1234',
        email: 'educacao@lambari.gov.br',
        endereco: 'Rua Principal, 100 - Lambari, MG'
      }
    });
    console.log('✓ Secretaria de Educação criada');
  }

  let secretariaSaude = await prisma.secretaria.findFirst({
    where: { nome: 'Secretaria de Saúde' }
  });

  if (!secretariaSaude) {
    secretariaSaude = await prisma.secretaria.create({
      data: {
        nome: 'Secretaria de Saúde',
        sigla: 'SESAU',
        descricao: 'Responsável pela saúde pública municipal',
        telefone: '(35) 3343-5678',
        email: 'saude@lambari.gov.br',
        endereco: 'Avenida Centro, 200 - Lambari, MG'
      }
    });
    console.log('✓ Secretaria de Saúde criada');
  }

  // Criar notícias
  const noticias = [
    {
      titulo: 'Inauguração da Nova Escola Municipal',
      resumo: 'A prefeitura inaugura moderna escola com estrutura completa para alunos do ensino fundamental.',
      conteudo: `A Prefeitura de Lambari realiza nesta segunda-feira a inauguração oficial da Nova Escola Municipal Dr. Mário de Andrade. 
      
A unidade educacional, fruto de investimento de mais de R$ 2 milhões, conta com:
- 12 salas de aula com ar-condicionado
- Laboratório de informática com 40 computadores
- Biblioteca equipada com acervo de 5 mil livros
- Quadra poliesportiva coberta
- Refeitório com capacidade para 200 alunos
- Parque infantil com brinquedos seguros

O evento contará com a presença do prefeito municipal, secretário de educação e representantes da comunidade.`,
      imagemCapa: 'https://images.unsplash.com/photo-1427504494785-cdde7dcbab89?w=800&h=400&fit=crop',
      destaque: true,
      autorId: user.id,
      secretariaId: secretariaEducacao.id
    },
    {
      titulo: 'Campanha de Vacinação Contra Influenza Inicia',
      resumo: 'Secretaria de Saúde inicia campanha de vacinação contra influenza para população de risco.',
      conteudo: `A Secretaria de Saúde da Prefeitura de Lambari iniciou nesta terça-feira a Campanha de Vacinação Contra Influenza 2026.

PÚBLICO-ALVO:
- Idosos com 60 anos ou mais
- Gestantes
- Crianças de 6 meses a menores de 5 anos
- Profissionais de saúde
- Pessoas com doenças crônicas

HORÁRIO DE FUNCIONAMENTO:
- De segunda a sexta: 7h às 17h
- Sábados: 8h às 12h

LOCAIS DE VACINAÇÃO:
- Posto de Saúde Central
- Postos de saúde dos bairros

A vacina está disponível gratuitamente e é importante se vacinar para prevenir complicações da influenza.`,
      imagemCapa: 'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=800&h=400&fit=crop',
      destaque: true,
      autorId: user.id,
      secretariaId: secretariaSaude.id
    },
    {
      titulo: 'Reforma da Praça Central Avança',
      resumo: 'Obras de revitalização da praça central se aproximam do término com novas áreas de convivência.',
      conteudo: `As obras de revitalização da Praça Central de Lambari atingiram 85% de conclusão. O projeto inclui:

MELHORIAS IMPLEMENTADAS:
- Novo piso com padrão paisagístico
- Fonte central com sistema de iluminação LED
- Áreas de convivência com bancos modernos
- Pista de caminhada de 500 metros
- Iluminação pública de eficiência energética
- Paisagismo com plantas nativas

PREVISÃO DE CONCLUSÃO:
As obras devem ser finalizadas em 45 dias. Após conclusão, a praça receberá a programação cultural de reabilitação com shows e apresentações locais.

A revitalização visa criar um espaço moderno e seguro para que a população possa desfrutar do lazer e convivência comunitária.`,
      imagemCapa: 'https://images.unsplash.com/photo-1511813312343-4b4aea3f3340?w=800&h=400&fit=crop',
      destaque: false,
      autorId: user.id,
      secretariaId: null
    },
    {
      titulo: 'Festival de Água Lambari 2026 é Anunciado',
      resumo: 'Prefeito anuncia data e atrações do maior evento cultural do município.',
      conteudo: `A Prefeitura de Lambari anuncia a realização do Festival de Água Lambari 2026, que acontecerá nos dias 15 a 22 de março no parque municipal.

ATRAÇÕES CONFIRMADAS:
- Shows musicais com artistas regionais e nacionais
- Feira de gastronomia local
- Exposição de artesanato
- Atividades para crianças
- Competições de natação
- Palco aberto para apresentações locais

PROGRAMAÇÃO:
- Abertura: 15 de março às 19h
- Shows principais: 16 a 21 de março
- Festival de encerramento: 22 de março

O festival é uma oportunidade para promover o turismo, a cultura e a economia local, reafirmando Lambari como destino turístico de relevância regional.`,
      imagemCapa: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&h=400&fit=crop',
      destaque: true,
      autorId: user.id,
      secretariaId: null
    },
    {
      titulo: 'Programa de Capacitação Profissional Abre Inscrições',
      resumo: 'Secretaria oferece cursos gratuitos para desempregados e interessados em requalificação profissional.',
      conteudo: `A Prefeitura de Lambari abre inscrições para o Programa de Capacitação Profissional, oferecendo diversos cursos gratuitos.

CURSOS DISPONÍVEIS:
1. Eletricista Predial
2. Assistente Administrativo
3. Técnico em Manutenção de Equipamentos
4. Operador de Caixa
5. Atendimento ao Cliente
6. Informática Básica
7. Web Design Introdutório

REQUISITOS:
- Ter 18 anos ou mais
- Ter cursado até a 2ª série do ensino médio
- Comprovante de residência em Lambari

INSCRIÇÕES:
- Local: Secretaria de Desenvolvimento Econômico
- Período: 20 a 27 de janeiro
- Preenchimento: Formulário disponível na prefeitura

Os cursos iniciam em 3 de fevereiro e têm duração de 3 meses. Certificado de conclusão será fornecido a todos os participantes.`,
      imagemCapa: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      destaque: false,
      autorId: user.id,
      secretariaId: null
    },
    {
      titulo: 'Plantio de Árvores Nativas Marca Semana do Meio Ambiente',
      resumo: 'Prefeitura realiza ação de reflorestamento com participação da comunidade.',
      conteudo: `Em comemoração à Semana do Meio Ambiente, a Prefeitura de Lambari realizou plantio de 500 árvores nativas nas margens do rio.

OBJETIVO:
- Contribuir para a sustentabilidade ambiental
- Preservar as margens do rio
- Criar corredores ecológicos
- Aumentar a cobertura verde da cidade

ÁRVORES PLANTADAS:
- Ipê Roxo
- Pau d'Alho
- Jequitibá
- Cedro
- Angico
- Guarantã

PARTICIPANTES:
- Órgãos municipais
- Escolas municipais
- Comunidade em geral
- Grupos ambientalistas

A ação reforça o compromisso da Prefeitura com a preservação ambiental e a educação ecológica da população, visando um futuro mais sustentável para Lambari.`,
      imagemCapa: 'https://images.unsplash.com/photo-1559027615-cdds628a0c4d?w=800&h=400&fit=crop',
      destaque: false,
      autorId: user.id,
      secretariaId: null
    }
  ];

  console.log('\nCriando notícias...');
  for (const noticia of noticias) {
    const noticiaExistente = await prisma.noticia.findFirst({
      where: { titulo: noticia.titulo }
    });

    if (!noticiaExistente) {
      await prisma.noticia.create({
        data: noticia
      });
      console.log(`✓ Notícia criada: ${noticia.titulo}`);
    } else {
      console.log(`⊘ Notícia já existe: ${noticia.titulo}`);
    }
  }

  console.log('\n✓ Seed de notícias concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
