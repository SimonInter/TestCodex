import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { getProductBySlug } from "@/server/prisma/queries";
import { formatPrice } from "@/lib/utils";
import ProductCustomizer from "@/features/customizer/product-customizer";
import ProductRecommendations from "@/components/commerce/product-recommendations";
import { Shell } from "@/components/layout/shell";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Produit introuvable"
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.media.map((url) => ({ url }))
    },
    alternates: {
      canonical: `/product/${product.slug}`
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  return (
    <Shell>
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
            <Image src={product.heroImage} alt={product.name} fill className="object-cover" priority />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {product.media.slice(1).map((image) => (
              <div key={image} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={image} alt={`${product.name} alternative`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-terracotta">{product.categories[0]}</p>
            <h1 className="font-display text-4xl text-charcoal">{product.name}</h1>
            <p className="text-sm text-charcoal/80">{product.description}</p>
            <p className="text-lg font-semibold text-terracotta">
              À partir de {formatPrice(product.basePrice)}
            </p>
          </div>
          <Suspense fallback={<div>Chargement du configurateur...</div>}>
            <ProductCustomizer product={product} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div className="px-6">Chargement des recommandations...</div>}>
        <ProductRecommendations productId={product.id} />
      </Suspense>
    </Shell>
  );
}
