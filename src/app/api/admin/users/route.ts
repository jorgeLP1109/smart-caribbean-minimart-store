import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            // Opcional: Seleccionar solo los campos que necesitas para no exponer la contraseña hasheada
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('[ADMIN_USERS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}