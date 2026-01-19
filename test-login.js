#!/usr/bin/env node

/**
 * Script de teste de autenticação
 * Valida se as credenciais admin funcionam corretamente
 */

const API_URL = process.env.API_URL || "http://localhost:3002";
const CREDENTIALS = {
  email: "admin@lambari.gov.br",
  password: "Admin@123"
};

async function testLogin() {
  console.log("\n🧪 TESTE DE AUTENTICAÇÃO - PAINEL ADMINISTRATIVO\n");
  console.log("=" .repeat(50));
  console.log(`📍 API: ${API_URL}`);
  console.log(`📧 Email: ${CREDENTIALS.email}`);
  console.log(`🔐 Senha: ${CREDENTIALS.password}`);
  console.log("=" .repeat(50));

  try {
    console.log("\n⏳ Iniciando teste de login...\n");

    const response = await fetch(`${API_URL}/api/auth/callback/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CREDENTIALS),
    });

    console.log(`📬 Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      console.log("\n✅ LOGIN REALIZADO COM SUCESSO!\n");
      console.log("✨ As credenciais estão funcionando corretamente!");
      console.log("\n🚀 Próximos passos:");
      console.log("  1. Acesse http://localhost:3002/admin/login");
      console.log("  2. Insira as credenciais acima");
      console.log("  3. Clique em 'Entrar'");
      console.log("  4. Você será redirecionado para o dashboard\n");
      return true;
    } else {
      console.log("\n❌ ERRO NO LOGIN\n");
      const data = await response.json();
      console.log("Resposta da API:", data);
      return false;
    }
  } catch (error) {
    console.log("\n❌ ERRO AO CONECTAR COM A API\n");
    console.error("Detalhes:", error);
    console.log("\n💡 Verifique se o servidor está rodando:");
    console.log(`   npm run dev (porta 3002)\n`);
    return false;
  }
}

// Executar teste
testLogin().then((success) => {
  process.exit(success ? 0 : 1);
});
