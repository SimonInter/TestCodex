import { z } from "zod";

export const customizationOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["select", "text", "file", "color", "boolean"]),
  required: z.boolean().default(false),
  priceImpact: z.number().default(0),
  values: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        value: z.string(),
        priceImpact: z.number().default(0),
        imageOverlay: z.string().optional()
      })
    )
    .optional(),
  config: z
    .object({
      maxLength: z.number().optional(),
      fonts: z.array(z.string()).optional(),
      positions: z.array(z.string()).optional()
    })
    .optional()
});

export const customizationSchema = z.object({
  optionId: z.string(),
  value: z.union([z.string(), z.boolean(), z.object({ url: z.string(), name: z.string() })])
});

export type CustomizationOption = z.infer<typeof customizationOptionSchema>;
export type ProductCustomizationInput = z.infer<typeof customizationSchema>;

export type ProductCustomization = {
  optionId: string;
  value: string | boolean | { url: string; name: string };
};

export type ProductVariant = {
  id: string;
  sku: string;
  price: number;
  stock: number;
  options: Record<string, string>;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  media: string[];
  heroImage: string;
  categories: string[];
  customizationOptions: CustomizationOption[];
  variants: ProductVariant[];
  leadTimeDays: number;
};
