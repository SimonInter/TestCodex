import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get("id");
  if (!cartId) return NextResponse.json(null);

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: true }
  });

  return NextResponse.json(cart);
}
