// archivo: src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@prisma/client';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          if (existingItem) {
            // Si ya existe, actualiza la cantidad
            const updatedItems = state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return { items: updatedItems };
          } else {
            // Si no, lo añade
            return { items: [...state.items, { product, quantity }] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // Nombre de la clave en LocalStorage para persistir el carrito
    }
  )
);