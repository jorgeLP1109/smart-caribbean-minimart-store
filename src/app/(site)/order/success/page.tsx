// archivo: src/app/(site)/order/success/page.tsx
'use client';

import { useEffect } from "react";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
    const clearCart = useCartStore((state) => state.clearCart);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    // Limpiar el carrito solo si venimos de un pago exitoso de Stripe
    useEffect(() => {
        if (sessionId) {
            clearCart();
        }
    }, [sessionId, clearCart]);

    return (
        <div className="container mx-auto text-center py-20">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold">Thank You!</h1>
                <p className="mt-4 text-lg">Your order has been placed successfully.</p>
                <p className="mt-2">We've sent a confirmation email to you (functionality to be implemented).</p>
                <Link href="/" className="btn-primary mt-8">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}