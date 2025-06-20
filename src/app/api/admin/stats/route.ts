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
        const totalSalesData = await prisma.order.aggregate({
            _sum: { total: true },
            where: { status: 'COMPLETED' },
        });
        const totalOrders = await prisma.order.count();
        const totalProducts = await prisma.product.count();
        const totalUsers = await prisma.user.count();
        
        const stats = {
            totalSales: totalSalesData._sum.total || 0,
            totalOrders,
            totalProducts,
            totalUsers,
        };
        return NextResponse.json(stats);
    } catch (error) {
        console.error('[ADMIN_STATS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}