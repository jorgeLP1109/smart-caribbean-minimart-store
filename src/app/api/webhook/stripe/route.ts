import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session?.metadata?.orderItems || !session?.metadata?.shippingAddress) {
            console.error("Webhook Error: Missing orderItems or shippingAddress in metadata");
            return new NextResponse("Missing metadata", { status: 400 });
        }

        const orderItems: { productId: string, quantity: number }[] = JSON.parse(session.metadata.orderItems);
        const shippingAddress = JSON.parse(session.metadata.shippingAddress);
        const total = session.amount_total ? session.amount_total / 100 : 0;
        const userEmail = session.customer_details?.email;
        
        try {
            const user = userEmail ? await prisma.user.findUnique({ where: { email: userEmail } }) : null;

            if (!user) {
               console.warn("Webhook: User not found for email:", userEmail);
               return new NextResponse("User not found, order cannot be created", { status: 404 });
            }

            await prisma.$transaction(async (tx) => {
                const productIds = orderItems.map(item => item.productId);
                const productsInDb = await tx.product.findMany({
                    where: { id: { in: productIds } }
                });

                const productPriceMap = new Map(productsInDb.map(p => [p.id, p.price]));

                const order = await tx.order.create({
                    data: {
                        userId: user.id,
                        total,
                        status: 'COMPLETED',
                        stripePaymentIntentId: String(session.payment_intent),
                        shippingAddress: shippingAddress, // Guardamos el objeto de dirección
                        items: {
                            create: orderItems.map(item => {
                                const price = productPriceMap.get(item.productId);
                                if (price === undefined) {
                                    throw new Error(`Product with ID ${item.productId} not found for price lookup.`);
                                }
                                return {
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    price: price,
                                };
                            })
                        }
                    }
                });

                for (const item of orderItems) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: {
                            stock: {
                                decrement: item.quantity,
                            },
                        },
                    });
                }
                
                console.log(`Successfully created order ${order.id} and updated stock.`);
            });

        } catch (error) {
            console.error("Error processing successful payment webhook:", error);
            return new NextResponse("Webhook handler failed. See logs.", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}