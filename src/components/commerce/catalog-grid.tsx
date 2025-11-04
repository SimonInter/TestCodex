import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/server/prisma/client";
import { formatPrice } from "@/lib/utils";

interface CatalogGridProps {
  searchParams: Record<string, string | string[]>;
}

export const CatalogGrid = async ({ searchParams }: CatalogGridProps) => {
  const category = searchParams.category as string | undefined;
  const minPrice = Number(searchParams.minPrice ?? 0);
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { collections: { some: { slug: category } } } : {}),
      ...(maxPrice ? { basePrice: { gte: minPrice, lte: maxPrice } } : { basePrice: { gte: minPrice } })
    },
    include: {
      collections: true
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">Catalogue</h1>
        <p className="text-sm text-charcoal/70">{products.length} produits</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group overflow-hidden rounded-[2rem] border border-charcoal/10 bg-cream shadow-soft"
          >
            <div className="relative aspect-[4/5]">
              <Image src={product.heroImage} alt={product.name} fill className="object-cover transition group-hover:scale-105" />
            </div>
            <div className="space-y-1 p-5">
              <p className="font-display text-xl text-charcoal">{product.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-terracotta">
                {product.collections.map((collection) => collection.name).join(" • ")}
              </p>
              <p className="text-sm text-charcoal/80">À partir de {formatPrice(product.basePrice)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
