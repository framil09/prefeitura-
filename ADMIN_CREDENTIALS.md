# 🔐 Credenciais de Acesso - Painel Administrativo

## Usuário Admin - Hardcoded

**Email:** `admin@lambari.gov.br`  
**Senha:** `Admin@123`

---

## 📍 Como Acessar

1. Acesse: http://localhost:3002/admin/login
2. Insira as credenciais acima
3. Clique em "Entrar"
4. Você será redirecionado para o dashboard administrativo

---

## ✅ Status de Implementação

- ✅ Usuário criado no banco de dados com bcrypt hash
- ✅ Seed script configurado para gerar credenciais
- ✅ Página de login exibe as credenciais de teste
- ✅ Autenticação funcional via NextAuth.js
- ✅ Redirecionamento automático para `/admin/dashboard`

---

## 🔍 Informações Técnicas

- **Framework:** Next.js 14 com App Router
- **Autenticação:** NextAuth.js + CredentialsProvider
- **Banco:** PostgreSQL com Prisma ORM
- **Hashing:** bcryptjs
- **Email do usuário:** admin@lambari.gov.br
- **Role:** ADMIN (acesso completo ao painel)

---

## 📝 Banco de Dados

O usuário foi criado através do script seed (`scripts/seed.ts`):

```typescript
await prisma.user.create({
  data: {
    email: "admin@lambari.gov.br",
    password: hashedAdminPassword, // Hash de "Admin@123"
    name: "Administrador",
    role: "ADMIN"
  }
});
```

---

## 🚀 Próximos Passos

Para usar em produção:
1. Altere a senha do usuário admin
2. Remova o display das credenciais da página de login
3. Configure um NEXTAUTH_SECRET seguro
4. Use variáveis de ambiente para dados sensíveis

---

**Data de Configuração:** 18 de janeiro de 2026
