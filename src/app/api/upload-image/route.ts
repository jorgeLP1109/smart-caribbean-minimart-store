// archivo: src/app/api/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getAuthSession } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { image } = body; // La imagen vendrá como una cadena base64

        if (!image) {
            return new NextResponse("Image data is required", { status: 400 });
        }

        const uploadResponse = await cloudinary.uploader.upload(image, {
            // Opciones de subida, por ejemplo, guardarla en una carpeta
            folder: 'smart-caribbean-minimart',
        });

        return NextResponse.json({ url: uploadResponse.secure_url });

    } catch (error) {
        console.error("[IMAGE_UPLOAD_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}