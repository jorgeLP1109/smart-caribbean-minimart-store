// archivo: src/app/api/addresses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET: Obtener las direcciones del usuario logueado
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const addresses = await prisma.address.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(addresses);
    } catch (error) {
        console.error('[ADDRESSES_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

// POST: Añadir una nueva dirección para el usuario logueado
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { fullName, street, city, state, postalCode, country, phone } = body;

        if (!fullName || !street || !city || !state || !postalCode || !country || !phone) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const newAddress = await prisma.address.create({
            data: {
                userId: session.user.id,
                fullName,
                street,
                city,
                state,
                postalCode,
                country,
                phone
            }
        });
        return NextResponse.json(newAddress);
    } catch (error) {
        console.error('[ADDRESSES_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}