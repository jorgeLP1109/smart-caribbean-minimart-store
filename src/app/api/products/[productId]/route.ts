import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthSession } from '@/lib/auth';

const prisma = new PrismaClient();

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
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[PRODUCT_DELETE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

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