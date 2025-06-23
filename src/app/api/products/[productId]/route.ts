import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthSession } from '@/lib/auth';

const prisma = new PrismaClient();

// DELETE: Eliminar un producto
export async function DELETE(req: NextRequest) {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const productId = req.nextUrl.pathname.split('/').pop();
    if (!productId) {
        return new NextResponse("Product ID is required", { status: 400 });
    }

    try {
        await prisma.product.delete({
            where: { id: productId },
        });

        // Invalida la caché de la página de inicio.
        // Construimos la URL completa para asegurarnos de que funcione en el entorno del servidor.
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const secret = process.env.REVALIDATE_SECRET_TOKEN;
        
        // Usamos fetch en lugar de axios para evitar dependencias innecesarias en la API
        await fetch(`${baseUrl}/api/revalidate?path=/&secret=${secret}`);
        console.log(`Cache revalidation requested for path: /`);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[PRODUCT_DELETE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

// PUT: Actualizar un producto
export async function PUT(req: NextRequest) {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const productId = req.nextUrl.pathname.split('/').pop();
    if (!productId) {
        return new NextResponse("Product ID is required", { status: 400 });
    }

    try {
        const body = await req.json();
        const { name, description, price, stock, category, image } = body;

        if (!name || price === undefined || stock === undefined) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price,
                stock,
                category,
                image,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(`[PRODUCT_UPDATE_ERROR] for ID ${productId}:`, error);
        return new NextResponse('Internal error', { status: 500 });
    }
}