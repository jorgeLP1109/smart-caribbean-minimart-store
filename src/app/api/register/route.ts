// archivo: src/app/api/register/route.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // --- 1. Obtener los nuevos campos del body ---
    const { email, name, password, address } = body;
    const { fullName, street, city, state, postalCode, country, phone } = address;

    if (!email || !name || !password || !street || !city || !postalCode || !country || !phone) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return new NextResponse('User already exists', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // --- 2. Crear el usuario y su dirección en una transacción ---
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        addresses: {
          create: [
            {
              fullName: name, // Usamos el nombre del usuario como nombre completo por defecto
              street,
              city,
              state,
              postalCode,
              country,
              phone,
              isDefault: true, // La primera dirección es la predeterminada
            },
          ],
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("REGISTER_ERROR", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}