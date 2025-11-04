"use client";

import { useCartStore, useCartTotals } from "@/features/customizer/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const CartDrawer = () => {
  const { items, closeCart } = useCartStore((state) => ({
    items: state.items,
    closeCart: state.closeCart
  }));
  const { total } = useCartTotals();
  const isOpen = useCartStore((state) => state.isOpen);
  const router = useRouter();

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-cream shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Panier"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-charcoal/10 p-4">
          <p className="text-lg font-semibold text-charcoal">Votre panier</p>
          <button onClick={closeCart} className="text-sm text-terracotta underline">
            Fermer
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-sm text-charcoal/70">Votre panier est vide.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-2xl border border-charcoal/10 p-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-sand">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-charcoal">{item.name}</p>
                  <p className="text-xs text-charcoal/60">
                    {item.customization
                    .map((custom) => (typeof custom.value === "object" ? custom.value.name : String(custom.value)))
                    .filter((value) => value && value !== "false")
                    .join(", ")}
                  </p>
                </div>
                <p className="text-sm font-semibold text-charcoal">{formatPrice(item.price)}</p>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-charcoal/10 p-4">
          <div className="flex items-center justify-between text-sm">
            <span>Total</span>
            <span className="text-lg font-semibold text-charcoal">{formatPrice(total)}</span>
          </div>
          <Button
            className="mt-4 w-full"
            size="lg"
            onClick={() => {
              closeCart();
              router.push("/checkout");
            }}
            disabled={items.length === 0}
          >
            Passer au paiement
          </Button>
        </div>
      </div>
    </div>
  );
};
