-- CreateTable
CREATE TABLE "EditalChamadaPublica" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "dataAbertura" TIMESTAMP(3),
    "dataEncerramento" TIMESTAMP(3),
    "documentoUrl" TEXT,
    "resultadoUrl" TEXT,
    "conteudo" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EditalChamadaPublica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EditalChamadaPublica_numero_key" ON "EditalChamadaPublica"("numero");

-- CreateIndex
CREATE INDEX "EditalChamadaPublica_numero_idx" ON "EditalChamadaPublica"("numero");

-- CreateIndex
CREATE INDEX "EditalChamadaPublica_ativo_idx" ON "EditalChamadaPublica"("ativo");

-- CreateIndex
CREATE INDEX "EditalChamadaPublica_destaque_idx" ON "EditalChamadaPublica"("destaque");
