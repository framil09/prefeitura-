-- CreateTable
CREATE TABLE "AtrativoTuristico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoria" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "fotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "videos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fotoDestaque" TEXT,
    "localizacao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AtrativoTuristico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AtrativoTuristico_ativo_idx" ON "AtrativoTuristico"("ativo");

-- CreateIndex
CREATE INDEX "AtrativoTuristico_destaque_idx" ON "AtrativoTuristico"("destaque");

-- CreateIndex
CREATE INDEX "AtrativoTuristico_ordem_idx" ON "AtrativoTuristico"("ordem");
