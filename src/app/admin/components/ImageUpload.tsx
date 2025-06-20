// archivo: src/app/admin/components/ImageUpload.tsx (Versión de Depuración)
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';

interface ImageUploadProps {
  onChange: (value: string) => void;
}

import type { CloudinaryUploadWidgetResults } from 'next-cloudinary';

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const handleUpload = useCallback((result: CloudinaryUploadWidgetResults) => {
    // ESTE ES EL CONSOLE.LOG MÁS IMPORTANTE
    console.log('--- CLOUDINARY WIDGET RESULT ---');
    console.log(result);
    // ------------------------------------

    // Extraemos la URL segura del objeto de información
    const imageUrl = typeof result.info === 'object' && result.info !== null && 'secure_url' in result.info
      ? (result.info as { secure_url?: string }).secure_url
      : undefined;

    // Si obtuvimos una URL, la pasamos al componente padre
    if (result.event === 'success' && imageUrl) {
      console.log('SUCCESS! URL FOUND:', imageUrl);
      onChange(imageUrl);
    }
  }, [onChange]);

  return (
    <CldUploadWidget 
      onSuccess={handleUpload} // Usamos onSuccess para mayor fiabilidad
      uploadPreset="ml_default"
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open?.()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Upload Image (Debug)
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;