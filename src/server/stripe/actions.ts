"use server";

import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2023-10-16"
});

const lineItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1)
});

const createPaymentIntentSchema = z.object({
  email: z.string().email(),
  amount: z.number().min(0),
  items: z.array(lineItemSchema)
});

export const createPaymentIntent = async (input: z.infer<typeof createPaymentIntentSchema>) => {
  const payload = createPaymentIntentSchema.parse(input);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: payload.amount,
    currency: "eur",
    receipt_email: payload.email,
    description: `Atelier Terracotta - ${payload.items.length} article(s)`,
    metadata: {
      items: JSON.stringify(payload.items)
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never"
    }
  });

  return {
    clientSecret: paymentIntent.client_secret,
    id: paymentIntent.id
  };
};
