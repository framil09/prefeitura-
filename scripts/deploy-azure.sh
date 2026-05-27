#!/bin/bash
# ============================================
# Script de Deploy para Azure App Service
# Plataforma Municipal de Lambari-MG
# ============================================
set -euo pipefail

# Configurações (sobrescreva via variáveis de ambiente)
RESOURCE_GROUP="${AZURE_RESOURCE_GROUP:-rg-plataforma-municipal}"
LOCATION="${AZURE_LOCATION:-brazilsouth}"
APP_NAME="${AZURE_APP_NAME:-plataforma-municipal}"
APP_PLAN="${AZURE_APP_PLAN:-plan-plataforma-municipal}"
DB_SERVER="${AZURE_DB_SERVER:-db-plataforma-municipal}"
DB_NAME="${AZURE_DB_NAME:-prefeitura_lambari}"
REGISTRY="${DOCKER_REGISTRY:-ghcr.io}"
IMAGE="${DOCKER_IMAGE:-qodeseven/plataforma-municipal:latest}"

echo "🏗️  Plataforma Municipal - Deploy Azure"
echo "========================================"
echo "Resource Group: $RESOURCE_GROUP"
echo "Location:       $LOCATION"
echo "App Name:       $APP_NAME"
echo ""

# 1. Criar Resource Group
echo "📦 Criando Resource Group..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output none

# 2. Criar Azure Database for PostgreSQL (Flexible Server)
echo "🗄️  Criando banco de dados PostgreSQL..."
az postgres flexible-server create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$DB_SERVER" \
  --location "$LOCATION" \
  --admin-user adminuser \
  --admin-password "${AZURE_DB_PASSWORD:?Defina AZURE_DB_PASSWORD}" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 16 \
  --yes --output none 2>/dev/null || echo "DB já existe, continuando..."

# Criar database
az postgres flexible-server db create \
  --resource-group "$RESOURCE_GROUP" \
  --server-name "$DB_SERVER" \
  --database-name "$DB_NAME" \
  --output none 2>/dev/null || echo "Database já existe, continuando..."

# Permitir acesso de serviços Azure
az postgres flexible-server firewall-rule create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$DB_SERVER" \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0 \
  --output none 2>/dev/null || true

DB_HOST=$(az postgres flexible-server show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$DB_SERVER" \
  --query "fullyQualifiedDomainName" -o tsv)

DATABASE_URL="postgresql://adminuser:${AZURE_DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}?sslmode=require"

# 3. Criar App Service Plan
echo "📋 Criando App Service Plan..."
az appservice plan create \
  --name "$APP_PLAN" \
  --resource-group "$RESOURCE_GROUP" \
  --is-linux \
  --sku B1 \
  --output none 2>/dev/null || echo "Plan já existe, continuando..."

# 4. Criar Web App
echo "🌐 Criando Web App..."
az webapp create \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --plan "$APP_PLAN" \
  --deployment-container-image-name "$REGISTRY/$IMAGE" \
  --output none 2>/dev/null || echo "App já existe, continuando..."

# 5. Configurar variáveis de ambiente
echo "⚙️  Configurando variáveis de ambiente..."
az webapp config appsettings set \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --settings \
    DATABASE_URL="$DATABASE_URL" \
    NEXTAUTH_SECRET="${NEXTAUTH_SECRET:?Defina NEXTAUTH_SECRET}" \
    NEXTAUTH_URL="https://${APP_NAME}.azurewebsites.net" \
    NEXT_PUBLIC_APP_URL="https://${APP_NAME}.azurewebsites.net" \
    NODE_ENV="production" \
    WEBSITES_PORT="3000" \
    OPENAI_API_KEY="${OPENAI_API_KEY:-}" \
    OPENWEATHER_API_KEY="${OPENWEATHER_API_KEY:-}" \
  --output none

# 6. Configurar health check
echo "❤️  Configurando health check..."
az webapp config set \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --generic-configurations '{"healthCheckPath": "/api/health"}' \
  --output none 2>/dev/null || true

# 7. Habilitar HTTPS only
az webapp update \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --https-only true \
  --output none

echo ""
echo "✅ Deploy concluído com sucesso!"
echo "🔗 URL: https://${APP_NAME}.azurewebsites.net"
echo ""
echo "📝 Próximos passos:"
echo "  1. Execute as migrations do Prisma contra o banco Azure"
echo "  2. Configure um domínio personalizado se necessário"
echo "  3. Configure Azure Monitor para alertas"
echo "  4. Revise as configurações de segurança"
