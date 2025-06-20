// archivo: src/app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// PUT: Actualizar el estado de una orden
export async function PUT(req: NextRequest, { params }: { params: { orderId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 });

    try {
        const body = await req.json();
        const { status } = body;
        const updatedOrder = await prisma.order.update({
            where: { id: params.orderId },
            data: { status }
        });
        return NextResponse.json(updatedOrder);
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 });
    }
}

// DELETE: Eliminar una orden
export async function DELETE(req: NextRequest, { params }: { params: { orderId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 });

    try {
        await prisma.order.delete({ where: { id: params.orderId } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 });
    }
}