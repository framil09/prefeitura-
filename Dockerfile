# ============================================
# Plataforma Municipal - Dockerfile Multi-Stage
# Otimizado para produção
# ============================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY prisma ./prisma/

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else npm install --legacy-peer-deps; \
  fi

# Generate Prisma Client
RUN npx prisma generate

# Stage 2: Builder
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments e exposição para variáveis de ambiente durante a compilação
ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

ENV DATABASE_URL=$DATABASE_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl curl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Define o limite máximo de Heap do Node.js em 1 GB para prevenir o OOM Killer (Exit Code 137)
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Garantir permissões corretas no diretório de trabalho
RUN chown -R nextjs:nodejs /app

# Copiar os arquivos da aplicação
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Copiar os binários do Prisma diretamente das dependências geradas
COPY --from=deps /app/node_modules/prisma ./node_modules/prisma
COPY --from=deps /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

# Healthcheck interno do container
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
