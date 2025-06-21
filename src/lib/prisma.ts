// archivo: src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate' // <-- Importa desde la nueva ubicación

// Creamos un cliente de Prisma y le aplicamos la extensión de Accelerate
const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate())
}

// Usamos un singleton para evitar crear múltiples instancias en desarrollo
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma