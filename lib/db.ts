import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Salva no objeto global em QUALQUER ambiente para reaproveitar a conexão
globalForPrisma.prisma = prisma
