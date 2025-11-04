import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/server/prisma/client";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
      apiVersion: "2023-10-16"
    });
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook error", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    await prisma.order.upsert({
      where: { paymentIntent: paymentIntent.id },
      update: { status: "PAID" },
      create: {
        paymentIntent: paymentIntent.id,
        email: paymentIntent.receipt_email ?? "client@example.com",
        subtotal: paymentIntent.amount_received,
        totalAmount: paymentIntent.amount_received,
        taxAmount: 0,
        shippingAmount: 0,
        currency: paymentIntent.currency,
        items: {
          create: [
            {
              productId: "seed-product",
              name: paymentIntent.description ?? "Produit personnalisé",
              sku: "SKU-SEED",
              unitPrice: paymentIntent.amount_received,
              quantity: 1,
              total: paymentIntent.amount_received,
              leadTimeDays: 7,
              optionSnapshot: {}
            }
          ]
        }
      }
    });
  }

  return NextResponse.json({ received: true });
}
