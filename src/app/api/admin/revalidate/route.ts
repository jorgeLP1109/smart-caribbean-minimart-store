// archivo: src/app/api/admin/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAuthSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
    // 1. Asegurarse de que solo un admin pueda llamar a esta ruta
    const session = await getAuthSession();
    if (session?.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Obtener la ruta a revalidar del cuerpo de la petición
    const body = await request.json();
    const { path } = body;

    if (!path) {
        return NextResponse.json({ message: 'Missing path to revalidate' }, { status: 400 });
    }

    try {
        // 3. Revalidar la ruta
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (error) {
        console.error("Revalidation error:", error);
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}