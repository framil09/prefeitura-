import { signIn } from "next-auth/react";

/**
 * Script de teste para validar as credenciais de admin
 * Email: admin@lambari.gov.br
 * Senha: Admin@123
 */

async function testarLogin() {
  console.log("🧪 Testando login com credenciais hardcoded...\n");

  const credentials = {
    email: "admin@lambari.gov.br",
    password: "Admin@123"
  };

  console.log(`📧 Email: ${credentials.email}`);
  console.log(`🔐 Senha: ${credentials.password}\n`);

  try {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false
    });

    if (result?.error) {
      console.error("❌ ERRO NO LOGIN:", result.error);
      return false;
    }

    if (result?.ok) {
      console.log("✅ LOGIN REALIZADO COM SUCESSO!");
      console.log("✨ Redirecionando para o dashboard...\n");
      return true;
    }
  } catch (error) {
    console.error("❌ ERRO AO TENTAR LOGIN:", error);
    return false;
  }
}

// Este arquivo é apenas para documentação
// O teste real será feito através da página de login
export { testarLogin };
