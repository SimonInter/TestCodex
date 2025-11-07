"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore, useCartTotals } from "@/features/customizer/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const addressSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  line1: z.string().min(1, "Adresse requise"),
  postalCode: z.string().min(4),
  city: z.string().min(1),
  country: z.string().default("FR"),
  email: z.string().email(),
  phone: z.string().optional()
});

type AddressForm = z.infer<typeof addressSchema>;

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const { total, itemCount } = useCartTotals();
  const items = useCartStore((state) => state.items);
  const reset = useCartStore((state) => state.reset);
  const form = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "FR"
    }
  });

  const onSubmit = async (values: AddressForm) => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            customization: item.customization
          }))
        })
      });
      const data = await response.json();
      console.log(data);
      reset();
      alert("Paiement simulé avec succès. Voir console pour le client secret.");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du paiement.");
    } finally {
      setLoading(false);
    }
  };

  if (itemCount === 0) {
    return <p className="text-center text-sm text-charcoal/70">Votre panier est vide.</p>;
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <h1 className="font-display text-3xl text-charcoal">Finaliser la commande</h1>
        <p className="text-sm text-charcoal/70">
          Livraison en France métropolitaine via Colissimo ou Chronopost. Paiements sécurisés Stripe.
        </p>
      </div>
      <div className="grid gap-4 rounded-2xl border border-charcoal/10 bg-cream p-6">
        <h2 className="text-lg font-semibold text-charcoal">Informations de contact</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Prénom" error={form.formState.errors.firstName?.message}>
            <input
              type="text"
              {...form.register("firstName")}
              className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            />
          </Field>
          <Field label="Nom" error={form.formState.errors.lastName?.message}>
            <input
              type="text"
              {...form.register("lastName")}
              className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            />
          </Field>
        </div>
        <Field label="Adresse" error={form.formState.errors.line1?.message}>
          <input
            type="text"
            {...form.register("line1")}
            className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Code postal" error={form.formState.errors.postalCode?.message}>
            <input
              type="text"
              {...form.register("postalCode")}
              className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            />
          </Field>
          <Field label="Ville" error={form.formState.errors.city?.message}>
            <input
              type="text"
              {...form.register("city")}
              className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            />
          </Field>
          <Field label="Pays" error={form.formState.errors.country?.message}>
            <input
              type="text"
              {...form.register("country")}
              className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            />
          </Field>
        </div>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <input
            type="email"
            {...form.register("email")}
            className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          />
        </Field>
        <Field label="Téléphone" error={form.formState.errors.phone?.message}>
          <input
            type="tel"
            {...form.register("phone")}
            className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          />
        </Field>
      </div>
      <div className="rounded-2xl border border-charcoal/10 bg-sand p-6">
        <div className="flex items-center justify-between text-sm">
          <span>Sous-total ({itemCount} articles)</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="mt-2 text-xs text-charcoal/60">
          Les frais de port sont calculés à l'étape suivante. Paiement test Stripe 4242 4242 4242 4242.
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Création du paiement..." : "Payer avec Stripe"}
      </Button>
    </form>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <label className="space-y-2 text-sm text-charcoal">
    <span className="font-medium">{label}</span>
    {children}
    {error ? <span className="block text-xs text-red-500">{error}</span> : null}
  </label>
);

export default CheckoutForm;
