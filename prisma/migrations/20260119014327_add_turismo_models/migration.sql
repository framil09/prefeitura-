/*
  Warnings:

  - You are about to drop the column `destaque` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `fotoDestaque` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `fotos` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `AtrativoTuristico` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `AtrativoTuristico` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AtrativoTuristico_destaque_idx";

-- AlterTable
ALTER TABLE "AtrativoTuristico" DROP COLUMN "destaque",
DROP COLUMN "email",
DROP COLUMN "endereco",
DROP COLUMN "fotoDestaque",
DROP COLUMN "fotos",
DROP COLUMN "localizacao",
DROP COLUMN "telefone",
DROP COLUMN "videos",
DROP COLUMN "website",
ADD COLUMN     "imagem" TEXT;

-- CreateTable
CREATE TABLE "FonteMuneral" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "propriedades" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FonteMuneral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FonteMuneral_ativo_idx" ON "FonteMuneral"("ativo");

-- CreateIndex
CREATE INDEX "FonteMuneral_ordem_idx" ON "FonteMuneral"("ordem");
