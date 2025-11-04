import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/server/prisma/client";
import { formatPrice } from "@/lib/utils";

interface ProductRecommendationsProps {
  productId: string;
}

const ProductRecommendations = async ({ productId }: ProductRecommendationsProps) => {
  const recommendations = await prisma.product.findMany({
    where: {
      id: { not: productId },
      isFeatured: true
    },
    take: 3
  });

  if (recommendations.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <h2 className="font-display text-3xl text-charcoal">Vous aimerez aussi</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {recommendations.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block overflow-hidden rounded-[2rem] border border-charcoal/10 bg-cream shadow-soft"
          >
            <div className="relative aspect-[4/5]">
              <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
            </div>
            <div className="space-y-2 p-5">
              <p className="font-display text-xl text-charcoal">{product.name}</p>
              <p className="text-sm text-charcoal/70">À partir de {formatPrice(product.basePrice)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductRecommendations;
