import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/prisma/client";
import { createPaymentIntent } from "@/server/stripe/actions";

const requestSchema = z.object({
  email: z.string().email(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1),
        customization: z
          .array(
            z.object({
              optionId: z.string(),
              value: z.union([
                z.string(),
                z.boolean(),
                z.object({
                  url: z.string().url(),
                  name: z.string()
                })
              ])
            })
          )
          .optional()
      })
    )
    .min(1)
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = requestSchema.parse(data);

    const products = await prisma.product.findMany({
      where: { id: { in: payload.items.map((item) => item.productId) } },
      include: {
        options: {
          include: {
            values: true
          }
        }
      }
    });

    const productMap = new Map(products.map((product) => [product.id, product]));

    const lineItems = payload.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      let unitPrice = product.basePrice;

      for (const option of product.options) {
        const selection = item.customization?.find((choice) => choice.optionId === option.id);

        if (!selection) {
          if (option.required) {
            throw new Error(`Missing required option ${option.id}`);
          }
          continue;
        }

        const getConfigPriceImpact = () => {
          const config = option.config as { priceImpact?: unknown } | null;
          return typeof config?.priceImpact === "number" ? config.priceImpact : 0;
        };

        if (option.type === "boolean") {
          if (typeof selection.value !== "boolean") {
            throw new Error(`Invalid value type for option ${option.id}`);
          }
          if (selection.value === true) {
            unitPrice += getConfigPriceImpact();
          }
          continue;
        }

        if (option.type === "select" || option.type === "color") {
          if (typeof selection.value !== "string") {
            throw new Error(`Invalid value type for option ${option.id}`);
          }
          const selectedValue = option.values.find((value) => value.id === selection.value);
          if (!selectedValue) {
            throw new Error(`Invalid option value ${selection.value} for option ${option.id}`);
          }
          unitPrice += selectedValue.priceImpact;
          continue;
        }

        if (option.type === "text") {
          if (typeof selection.value !== "string") {
            throw new Error(`Invalid value type for option ${option.id}`);
          }
          unitPrice += getConfigPriceImpact();
          continue;
        }

        if (option.type === "file") {
          if (
            typeof selection.value !== "object" ||
            selection.value === null ||
            typeof (selection.value as { url?: unknown }).url !== "string" ||
            typeof (selection.value as { name?: unknown }).name !== "string"
          ) {
            throw new Error(`Invalid value type for option ${option.id}`);
          }
          unitPrice += getConfigPriceImpact();
          continue;
        }
      }

      return {
        id: product.id,
        name: product.name,
        price: unitPrice,
        quantity: item.quantity
      };
    });

    const amount = lineItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const result = await createPaymentIntent({
      email: payload.email,
      amount,
      items: lineItems
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
