import { NextResponse } from "next/server";
import { z } from "zod";
import { createPaymentIntent } from "@/server/stripe/actions";

const requestSchema = z.object({
  email: z.string().email(),
  amount: z.number().min(0),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number()
    })
  )
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = requestSchema.parse(data);
    const result = await createPaymentIntent(payload);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
