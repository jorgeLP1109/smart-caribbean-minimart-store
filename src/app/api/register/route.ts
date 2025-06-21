import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, address } = body;

    // Validamos que el objeto 'address' y sus campos existan
    if (!address || !address.street || !address.city || !address.postalCode || !address.country || !address.phone) {
      return new NextResponse('Missing required address fields', { status: 400 });
    }
    
    if (!email || !name || !password) {
      return new NextResponse('Missing email, name, or password', { status: 400 });
    }

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return new NextResponse('User already exists', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        addresses: {
          create: [
            {
              fullName: name, // Usamos 'name' como fullName por defecto
              street: address.street,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
              country: address.country,
              phone: address.phone,
              isDefault: true,
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