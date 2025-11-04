import { prisma } from "@/server/prisma/client";
import { cache } from "react";

export const getFeaturedProducts = cache(async () => {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    include: {
      options: {
        include: {
          values: true
        }
      },
      variants: true,
      collections: true,
      media: true
    },
    take: 6
  });

  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    basePrice: product.basePrice,
    heroImage: product.heroImage,
    media: product.media.map((media) => media.url),
    categories: product.collections.map((collection) => collection.name),
    customizationOptions: product.options.map((option) => ({
      id: option.id,
      name: option.name,
      type: option.type,
      required: option.required,
      priceImpact: (option.config as any)?.priceImpact ?? 0,
      values: option.values.map((value) => ({
        id: value.id,
        label: value.label,
        value: value.value,
        priceImpact: value.priceImpact,
        imageOverlay: value.imageOverlay ?? undefined
      })),
      config: option.config as Record<string, unknown> | undefined
    })),
    variants: product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      price: variant.price,
      stock: variant.stock,
      options: variant.options as Record<string, string>
    })),
    leadTimeDays: product.leadTimeDays
  }));
});

export const getProductBySlug = cache(async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      options: {
        orderBy: { order: "asc" },
        include: {
          values: { orderBy: { order: "asc" } }
        }
      },
      variants: true,
      media: true,
      collections: true
    }
  });

  if (!product) return null;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    basePrice: product.basePrice,
    heroImage: product.heroImage,
    media: product.media.map((media) => media.url),
    categories: product.collections.map((collection) => collection.name),
    customizationOptions: product.options.map((option) => ({
      id: option.id,
      name: option.name,
      type: option.type,
      required: option.required,
      priceImpact: (option.config as any)?.priceImpact ?? 0,
      values: option.values.map((value) => ({
        id: value.id,
        label: value.label,
        value: value.value,
        priceImpact: value.priceImpact,
        imageOverlay: value.imageOverlay ?? undefined
      })),
      config: option.config as Record<string, unknown> | undefined
    })),
    variants: product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      price: variant.price,
      stock: variant.stock,
      options: variant.options as Record<string, string>
    })),
    leadTimeDays: product.leadTimeDays
  };
});
