"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface CustomizationPreviewProps {
  product: Product;
  values: Record<string, unknown>;
  price: number;
}

const overlayOrder = ["tissu", "couleur", "fermeture", "doublure", "broderie", "patch"];

export const CustomizationPreview = ({ product, values, price }: CustomizationPreviewProps) => {
  const overlays = product.customizationOptions
    .filter((option) => option.values)
    .flatMap((option) => {
      const selected = option.values?.find((value) => value.id === values[option.id]);
      if (!selected?.imageOverlay) return [];
      return [
        {
          id: `${option.id}-${selected.id}`,
          url: selected.imageOverlay,
          priority: overlayOrder.indexOf(option.name.toLowerCase()) || 0
        }
      ];
    })
    .sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-4 rounded-[2rem] border border-charcoal/10 bg-sand p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Aperçu en direct</p>
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream">
        <Image src={product.heroImage} alt={product.name} fill className="object-cover" priority />
        {overlays.map((overlay) => (
          <motion.div key={overlay.id} className="absolute inset-0">
            <Image src={overlay.url} alt="Personnalisation" fill className="object-cover" />
          </motion.div>
        ))}
        {values["broderie"] && typeof values["broderie"] === "string" && (
          <motion.span
            className="absolute inset-x-0 bottom-10 mx-auto w-3/4 text-center font-display text-2xl text-charcoal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {values["broderie"] as string}
          </motion.span>
        )}
      </div>
      <p className="text-sm text-charcoal/70">Prix dynamique : {formatPrice(price)}</p>
    </div>
  );
};
