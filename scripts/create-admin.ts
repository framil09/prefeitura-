import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function createAdminUser() {
  try {
    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@lambari.gov.br" }
    });

    if (existingUser) {
      console.log("Usuário admin já existe!");
      return;
    }

    // Hash da senha: Admin@123
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const user = await prisma.user.create({
      data: {
        email: "admin@lambari.gov.br",
        name: "Administrador Lambari",
        password: hashedPassword,
        role: "ADMIN"
      }
    });

    console.log("✅ Usuário administrador criado com sucesso!");
    console.log(`Email: ${user.email}`);
    console.log(`Senha: Admin@123`);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
