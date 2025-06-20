import { NextRequest, NextResponse } from "next/server";
import { headers as nextHeaders } from "next/headers";
import Stripe from "stripe";
import { CartItem } from "@/lib/store";
import { Address } from "@prisma/client";

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { cartItems, shippingAddress }: { cartItems: CartItem[], shippingAddress: Address } = body;

        if (!cartItems || cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }
        
        if (!shippingAddress) {
            return new NextResponse("Shipping address is required", { status: 400 });
        }

        const headers = await nextHeaders();
        const origin = headers.get("origin") || "http://localhost:3000";

        const line_items = cartItems.map((item) => {
            const imageUrl = item.product.image ? `${origin}${item.product.image}` : undefined;
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.name,
                        images: imageUrl ? [imageUrl] : [],
                    },
                    unit_amount: Math.round(item.product.price * 100),
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart?status=cancelled`,
            metadata: {
                orderItems: JSON.stringify(cartItems.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                }))),
                // Añadimos la dirección de envío a los metadatos
                shippingAddress: JSON.stringify(shippingAddress),
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error("[CHECKOUT_ERROR]", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}