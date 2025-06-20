import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthSession } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.error('[ADMIN_ORDERS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}