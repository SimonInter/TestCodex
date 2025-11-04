import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (!query) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } }
      ]
    },
    take: 10
  });

  return NextResponse.json(products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    heroImage: product.heroImage
  })));
}
