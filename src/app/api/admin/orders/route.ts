// archivo: src/app/api/admin/orders/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// ... (importa getServerSession y authOptions como en la API de stats)

const prisma = new PrismaClient();

export async function GET() {
    // ... (lógica de verificación de admin)

    const orders = await prisma.order.findMany({
        include: {
            user: true, // Incluir datos del usuario que hizo la orden
            items: {      // Incluir los productos de cada orden
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
}