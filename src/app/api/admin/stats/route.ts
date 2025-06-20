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
        // --- Obtención de Estadísticas Principales ---
        const totalSalesData = await prisma.order.aggregate({
            _sum: {
                total: true,
            },
            where: {
                status: 'COMPLETED',
            },
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

        // --- Obtención de Datos para el Gráfico ---
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailySales = await prisma.order.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
                status: 'COMPLETED'
            },
            _sum: {
                total: true,
            },
            orderBy: {
                createdAt: 'asc',
            }
        });

        // Formatear datos para que Recharts los pueda usar
        const chartData = dailySales.map(sale => {
            const date = new Date(sale.createdAt);
            // Agrupamos por día, ignorando la hora
            const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
            return {
                day,
                total: sale._sum.total || 0
            };
        }).reduce((acc, current) => {
            // Sumamos las ventas de órdenes que ocurrieron en el mismo día
            const existing = acc.find(item => item.day === current.day);
            if (existing) {
                existing.total += current.total;
            } else {
                acc.push(current);
            }
            return acc;
        }, [] as { day: string, total: number }[])
        .map(item => ({
             // Formato final para el gráfico
            name: new Date(item.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            total: item.total,
        }));
        
        // Combinar todos los datos en una sola respuesta
        const responseData = {
            ...stats,
            chartData,
        };

        return NextResponse.json(responseData);

    } catch (error) {
        console.error('[ADMIN_STATS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}