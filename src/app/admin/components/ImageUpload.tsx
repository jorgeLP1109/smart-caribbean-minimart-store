'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  // No necesitamos isMounted aquí
  const handleUpload = (result: any) => {
    // Solo reaccionamos al evento 'success'
    if (result.event === 'success' && result.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value && (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt="Imagen subida"
              src={value}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
      <CldUploadWidget 
        onUpload={handleUpload} // <-- Usamos onUpload en lugar de onSuccess
        uploadPreset="ml_default"
      >
        {({ open }) => {
          return (
            <button
              type="button"
              disabled={disabled}
              onClick={() => open?.()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;