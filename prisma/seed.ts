// archivo: prisma/seed.ts
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "Smartcaribbean@yahoo.com"; // <-- REEMPLAZA CON TU EMAIL REAL
  const adminPassword = "Paddington15@"; // <-- REEMPLAZA CON UNA CONTRASEÑA FUERTE

  console.log(`Checking for existing admin user: ${adminEmail}`);

  // 1. Verificar si el usuario administrador ya existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`Admin user ${adminEmail} already exists. Seeding skipped.`);
    return; // Si ya existe, no hacemos nada
  }

  // 2. Si no existe, lo creamos
  console.log(`Creating admin user...`);
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Admin",
      password: hashedPassword,
      role: UserRole.ADMIN, // Asignamos el rol de ADMIN
    },
  });

  console.log(`Successfully created admin user:`, adminUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });