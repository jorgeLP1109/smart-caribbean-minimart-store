// archivo: src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { stat, mkdir } from 'fs/promises'; // <-- 1. Importa 'stat' y 'mkdir'

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ success: false, error: 'File is not an image' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name.split('.')[0]}-${uniqueSuffix}.${file.name.split('.').pop()}`;
  
  // --- CORRECCIÓN: Asegurar que el directorio de subida existe ---
  const uploadDir = join(process.cwd(), 'public/uploads');
  const path = join(uploadDir, filename);

  try {
    // 2. Verifica si el directorio existe
    await stat(uploadDir);
  } catch (error: any) {
    // Si da un error 'ENOENT', significa que el directorio no existe
    if (error.code === 'ENOENT') {
      try {
        // 3. Crea el directorio
        await mkdir(uploadDir, { recursive: true });
      } catch (mkdirError) {
        console.error('Error creating directory:', mkdirError);
        return NextResponse.json({ success: false, error: 'Error creating upload directory' }, { status: 500 });
      }
    } else {
      console.error('Error checking directory:', error);
      return NextResponse.json({ success: false, error: 'Error checking directory' }, { status: 500 });
    }
  }
  // --- FIN DE LA CORRECCIÓN ---

  try {
    await writeFile(path, buffer);
    console.log(`File saved to ${path}`);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ success: false, error: 'Error saving file' }, { status: 500 });
  }
}