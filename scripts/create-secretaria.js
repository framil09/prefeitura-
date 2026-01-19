const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const secretaria = await prisma.secretaria.create({
      data: {
        nome: "Secretaria de Administração",
        sigla: "SEAM",
        descricao: "Secretaria de Administração Municipal",
        ativo: true
      }
    });
    console.log("✅ Secretaria criada com sucesso!");
    console.log("ID:", secretaria.id);
    console.log("Nome:", secretaria.nome);
  } catch (error) {
    console.error("❌ Erro:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
