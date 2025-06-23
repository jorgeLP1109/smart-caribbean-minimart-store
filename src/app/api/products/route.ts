import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';



export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('[PRODUCTS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, description, price, stock, category, image } = body;

        if (!name || price === undefined || stock === undefined) {
            return new NextResponse('Name, price and stock are required', { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                category,
                image,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('[PRODUCTS_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}