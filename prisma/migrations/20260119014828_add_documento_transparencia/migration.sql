-- CreateTable
CREATE TABLE "DocumentoTransparencia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "categoria" TEXT NOT NULL,
    "url" TEXT,
    "arquivo" TEXT,
    "dataPublicacao" TIMESTAMP(3),
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentoTransparencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DocumentoTransparencia_categoria_idx" ON "DocumentoTransparencia"("categoria");

-- CreateIndex
CREATE INDEX "DocumentoTransparencia_ativo_idx" ON "DocumentoTransparencia"("ativo");

-- CreateIndex
CREATE INDEX "DocumentoTransparencia_ordem_idx" ON "DocumentoTransparencia"("ordem");
