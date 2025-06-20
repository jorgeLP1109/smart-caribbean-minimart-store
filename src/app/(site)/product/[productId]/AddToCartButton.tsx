'use client';

import { useState } from 'react';
import { Product } from '@prisma/client';
import { useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  return (
    <div className="flex items-stretch gap-4">
      <div className="flex border border-gray-300 rounded-md">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="px-4 py-2 text-lg font-semibold text-gray-700 transition hover:bg-gray-100 rounded-l-md"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span
          className="w-16 flex items-center justify-center text-lg font-semibold border-l border-r border-gray-300"
        >
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
          className="px-4 py-2 text-lg font-semibold text-gray-700 transition hover:bg-gray-100 rounded-r-md"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="btn-primary flex-1 text-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}