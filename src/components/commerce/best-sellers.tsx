import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { getFeaturedProducts } from "@/server/prisma/queries";

const BestSellers = async () => {
  const products = await getFeaturedProducts();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-charcoal">Nos pièces préférées</h2>
          <p className="mt-2 text-sm text-charcoal/70">
            Best-sellers confectionnés à la main, prêts à être personnalisés.
          </p>
        </div>
        <Link href="/catalog" className="text-sm font-medium text-terracotta hover:text-terracotta-dark">
          Voir tout
        </Link>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {products.map((product: Product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block overflow-hidden rounded-[2rem] bg-cream shadow-soft transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/5]">
              <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
            </div>
            <div className="space-y-2 p-6">
              <p className="font-display text-xl text-charcoal">{product.name}</p>
              <p className="text-sm text-charcoal/70">{product.description}</p>
              <p className="text-sm font-semibold text-terracotta">
                À partir de {formatPrice(product.basePrice)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
