// archivo: src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route'; // Reutilizamos la config de auth
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

// GET: Obtener todos los productos
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('[PRODUCTS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

// POST: Crear un nuevo producto
export async function POST(req: Request) {
    // Primero, verificamos que el usuario sea Admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, description, price, stock, category, image } = body;

        if (!name || !price || !stock) {
            return new NextResponse('Name, price and stock are required', { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                category,
                image, // Asumimos que la URL de la imagen se envía
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('[PRODUCTS_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}