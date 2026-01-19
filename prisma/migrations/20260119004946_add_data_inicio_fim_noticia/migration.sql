-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SECRETARIO', 'EDITOR');

-- CreateEnum
CREATE TYPE "StatusLicitacao" AS ENUM ('ABERTA', 'EM_ANDAMENTO', 'ENCERRADA', 'SUSPENSA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoMidia" AS ENUM ('FOTO', 'VIDEO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
    "secretariaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secretaria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,
    "descricao" TEXT,
    "secretario" TEXT,
    "fotoSecretario" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "endereco" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Secretaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licitacao" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "objeto" TEXT NOT NULL,
    "descricaoDetalhada" TEXT,
    "valorEstimado" DECIMAL(15,2),
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "dataEncerramento" TIMESTAMP(3),
    "status" "StatusLicitacao" NOT NULL DEFAULT 'ABERTA',
    "editalUrl" TEXT,
    "contactoPessoa" TEXT,
    "contactoEmail" TEXT,
    "contactoTelefone" TEXT,
    "local" TEXT,
    "secretariaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Licitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT,
    "conteudo" TEXT NOT NULL,
    "imagemCapa" TEXT,
    "videoUrl" TEXT,
    "fotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "dataInicio" TIMESTAMP(3),
    "dataFim" TIMESTAMP(3),
    "autorId" TEXT,
    "secretariaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Midia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" "TipoMidia" NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Midia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracaoSite" (
    "id" TEXT NOT NULL,
    "nomeCidade" TEXT NOT NULL DEFAULT 'Lambari',
    "slogan" TEXT DEFAULT 'Estância Hidromineral',
    "fotoSlogan" TEXT,
    "logoUrl" TEXT,
    "bannerUrl" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "endereco" TEXT,
    "horarioAtendimento" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "youtubeUrl" TEXT,
    "prefeito" TEXT,
    "fotoPrefeito" TEXT,
    "vicePrefeito" TEXT,
    "fotoVicePrefeito" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracaoSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prefeito" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "foto" TEXT,
    "ano_inicio" INTEGER NOT NULL,
    "ano_fim" INTEGER,
    "descricao" TEXT,
    "partido" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prefeito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmendaImpositiva" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "autor" TEXT,
    "secretaria" TEXT,
    "valor" DECIMAL(15,2),
    "dataAutoria" TIMESTAMP(3),
    "dataExecucao" TIMESTAMP(3),
    "percentualExecucao" INTEGER DEFAULT 0,
    "documentoUrl" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmendaImpositiva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Noticia_publicado_idx" ON "Noticia"("publicado");

-- CreateIndex
CREATE INDEX "Noticia_destaque_idx" ON "Noticia"("destaque");

-- CreateIndex
CREATE INDEX "Prefeito_ano_inicio_idx" ON "Prefeito"("ano_inicio");

-- CreateIndex
CREATE INDEX "Prefeito_destaque_idx" ON "Prefeito"("destaque");

-- CreateIndex
CREATE UNIQUE INDEX "EmendaImpositiva_numero_key" ON "EmendaImpositiva"("numero");

-- CreateIndex
CREATE INDEX "EmendaImpositiva_numero_idx" ON "EmendaImpositiva"("numero");

-- CreateIndex
CREATE INDEX "EmendaImpositiva_ativo_idx" ON "EmendaImpositiva"("ativo");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_secretariaId_fkey" FOREIGN KEY ("secretariaId") REFERENCES "Secretaria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licitacao" ADD CONSTRAINT "Licitacao_secretariaId_fkey" FOREIGN KEY ("secretariaId") REFERENCES "Secretaria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_secretariaId_fkey" FOREIGN KEY ("secretariaId") REFERENCES "Secretaria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
