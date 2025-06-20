import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// DELETE: Eliminar un producto
export async function DELETE(
    req: NextRequest // Usamos NextRequest para obtener la URL
) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // --- CORRECCIÓN FINAL ---
    // Obtenemos el ID del último segmento de la URL
    const productId = req.nextUrl.pathname.split('/').pop();

    if (!productId) {
        return new NextResponse("Product ID is required", { status: 400 });
    }

    try {
        await prisma.product.delete({
            where: {
                id: productId,
            },
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[PRODUCT_DELETE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

// PUT: Actualizar un producto
export async function PUT(
    req: NextRequest // Usamos NextRequest para obtener la URL
) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // --- CORRECCIÓN FINAL ---
    // Obtenemos el ID del último segmento de la URL
    const productId = req.nextUrl.pathname.split('/').pop();

    if (!productId) {
        return new NextResponse("Product ID is required", { status: 400 });
    }

    try {
        const body = await req.json();
        const { name, description, price, stock, category, image } = body;

        // Validamos que los datos necesarios están presentes
        if (!name || price === undefined || stock === undefined || !category) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const product = await prisma.product.update({
            where: {
                id: productId,
            },
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