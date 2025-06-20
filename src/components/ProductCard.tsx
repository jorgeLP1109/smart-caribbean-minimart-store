'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
          <Image
            src={product.image || '/placeholder.png'} // Es buena idea tener una imagen 'placeholder.png' en tu carpeta /public
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg tracking-wider">SOLD OUT</span>
              </div>
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>
            {product.name}
          </h3>
          {product.category && (
            <p className="text-sm text-gray-500 capitalize">{product.category.replace(/-/g, ' ')}</p>
          )}
          <div className="mt-auto pt-2 text-xl font-bold text-brand-orange">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;