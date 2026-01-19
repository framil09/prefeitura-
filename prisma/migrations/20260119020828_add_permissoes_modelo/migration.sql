-- CreateEnum
CREATE TYPE "SecaoAdmin" AS ENUM ('DASHBOARD', 'GESTAO_MUNICIPAL', 'SECRETARIAS', 'TURISMO', 'TRANSPARENCIA', 'LICITACOES', 'EMENDAS_IMPOSITIVAS', 'NOTICIAS', 'GALERIA', 'USUARIOS', 'CONFIGURACAO');

-- CreateTable
CREATE TABLE "Permissao" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "secao" "SecaoAdmin" NOT NULL,
    "permitido" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permissao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Permissao_userId_idx" ON "Permissao"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Permissao_userId_secao_key" ON "Permissao"("userId", "secao");

-- AddForeignKey
ALTER TABLE "Permissao" ADD CONSTRAINT "Permissao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
