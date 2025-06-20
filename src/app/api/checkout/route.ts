import { NextRequest, NextResponse } from "next/server";
import { headers as nextHeaders } from "next/headers";
import Stripe from "stripe";
import { CartItem } from "@/lib/store";
import { Address } from "@prisma/client";

export const dynamic = 'force-dynamic';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing Stripe Secret Key in .env');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { cartItems, shippingAddress }: { cartItems: CartItem[], shippingAddress: Address } = body;

        if (!cartItems || cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }

        const line_items = cartItems.map((item) => {
            // Validación crucial: nos aseguramos de que la URL de la imagen sea pública (de Cloudinary)
            if (!item.product.image || !item.product.image.startsWith('https://res.cloudinary.com')) {
                throw new Error(`Product "${item.product.name}" has an invalid or local image URL. All product images must be hosted on Cloudinary for checkout.`);
            }
            
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.name,
                        images: [item.product.image], // Usamos directamente la URL de Cloudinary
                    },
                    unit_amount: Math.round(item.product.price * 100),
                },
                quantity: item.quantity,
            };
        });

        const headers = await nextHeaders();
        const origin = headers.get("origin");

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart?status=cancelled`,
            metadata: {
                orderItems: JSON.stringify(cartItems.map(item => ({ productId: item.product.id, quantity: item.quantity }))),
                shippingAddress: JSON.stringify(shippingAddress),
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error("[CHECKOUT_API] CRITICAL ERROR:", error.message);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}