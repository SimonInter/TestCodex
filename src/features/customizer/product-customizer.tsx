"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product, CustomizationOption } from "@/types/product";
import { useCartStore } from "@/features/customizer/cart-store";
import { v4 as uuid } from "uuid";
import { CustomizationPreview } from "@/features/customizer/preview";

const optionValueSchema = z.object({
  id: z.string(),
  value: z.string()
});

type OptionValueSchema = z.infer<typeof optionValueSchema>;

const customizationFormSchema = z.record(z.string(), z.any());

type CustomizationFormValues = z.infer<typeof customizationFormSchema>;

interface ProductCustomizerProps {
  product: Product;
}

const ProductCustomizer = ({ product }: ProductCustomizerProps) => {
  const [uploading, setUploading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { control, handleSubmit, watch } = useForm<CustomizationFormValues>({
    resolver: zodResolver(customizationFormSchema),
    defaultValues: product.customizationOptions.reduce((acc, option) => {
      if (option.type === "boolean") {
        acc[option.id] = false;
      } else if (option.type === "select" && option.values && option.values.length > 0) {
        acc[option.id] = option.values[0].id;
      } else {
        acc[option.id] = "";
      }
      return acc;
    }, {} as CustomizationFormValues)
  });

  const watchedValues = watch();

  const computedPrice = useMemo(() => {
    let price = product.basePrice;
    for (const option of product.customizationOptions) {
      const value = watchedValues[option.id];
      if (!value) continue;
      if (option.type === "select" && option.values) {
        const selected = option.values.find((v) => v.id === value);
        if (selected) {
          price += selected.priceImpact;
        }
      }
      if (option.type === "boolean" && value === true) {
        price += option.priceImpact ?? 0;
      }
    }
    return price;
  }, [product.basePrice, product.customizationOptions, watchedValues]);

  const onSubmit = async (values: CustomizationFormValues) => {
    setUploading(true);
    try {
      const itemId = uuid();
      addItem({
        id: itemId,
        productId: product.id,
        name: product.name,
        price: computedPrice,
        quantity: 1,
        image: product.heroImage,
        customization: Object.entries(values).map(([optionId, value]) => ({
          optionId,
          value: value as never
        }))
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <CustomizationPreview product={product} values={watchedValues} price={computedPrice} />
      <div className="space-y-4">
        {product.customizationOptions.map((option) => (
          <OptionField key={option.id} option={option} control={control} />
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-sand p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Total</p>
          <p className="text-2xl font-semibold text-charcoal">{formatPrice(computedPrice)}</p>
          <p className="text-xs text-charcoal/70">
            Délais estimés : {product.leadTimeDays} à {product.leadTimeDays + 4} jours ouvrés
          </p>
        </div>
        <Button type="submit" size="lg" disabled={uploading}>
          {uploading ? "Ajout en cours..." : "Ajouter au panier"}
        </Button>
      </div>
    </form>
  );
};

const OptionField = ({ option, control }: { option: CustomizationOption; control: any }) => {
  switch (option.type) {
    case "select":
      return <SelectField option={option} control={control} />;
    case "text":
      return <TextField option={option} control={control} />;
    case "boolean":
      return <BooleanField option={option} control={control} />;
    default:
      return <TextField option={option} control={control} />;
  }
};

const FieldWrapper = ({ option, children }: { option: CustomizationOption; children: React.ReactNode }) => (
  <div className="space-y-2 rounded-2xl border border-charcoal/10 bg-cream p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-charcoal">{option.name}</p>
        {option.priceImpact > 0 ? (
          <p className="text-xs text-charcoal/60">+ {formatPrice(option.priceImpact)}</p>
        ) : null}
      </div>
    </div>
    {children}
  </div>
);

const SelectField = ({ option, control }: { option: CustomizationOption; control: any }) => (
  <Controller
    control={control}
    name={option.id}
    render={({ field }) => (
      <FieldWrapper option={option}>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {option.values?.map((value) => (
            <button
              key={value.id}
              type="button"
              onClick={() => field.onChange(value.id)}
              className={`rounded-2xl border p-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 ${field.value === value.id ? "border-terracotta bg-terracotta/10" : "border-charcoal/10"}`}
            >
              <p className="font-medium text-charcoal">{value.label}</p>
              {value.priceImpact > 0 ? (
                <p className="text-xs text-charcoal/60">+ {formatPrice(value.priceImpact)}</p>
              ) : null}
            </button>
          ))}
        </div>
      </FieldWrapper>
    )}
  />
);

const TextField = ({ option, control }: { option: CustomizationOption; control: any }) => (
  <Controller
    control={control}
    name={option.id}
    render={({ field }) => (
      <FieldWrapper option={option}>
        <textarea
          {...field}
          rows={2}
          maxLength={option.config?.maxLength ? Number(option.config.maxLength) : undefined}
          className="w-full rounded-2xl border border-charcoal/10 bg-cream px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          placeholder="Entrez votre texte (ex: Monogramme)"
        />
        {option.config?.maxLength ? (
          <p className="text-xs text-charcoal/60">
            {field.value?.length ?? 0}/{option.config.maxLength} caractères
          </p>
        ) : null}
      </FieldWrapper>
    )}
  />
);

const BooleanField = ({ option, control }: { option: CustomizationOption; control: any }) => (
  <Controller
    control={control}
    name={option.id}
    render={({ field }) => (
      <FieldWrapper option={option}>
        <label className="flex items-center gap-3 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={field.value}
            onChange={(event) => field.onChange(event.target.checked)}
            className="h-4 w-4 rounded border-charcoal/20 text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          />
          Ajouter cette option
        </label>
      </FieldWrapper>
    )}
  />
);

export default ProductCustomizer;
