"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/features/customizer/cart-store";
import { Button } from "@/components/ui/button";

const CartTrigger = () => {
  const open = useCartStore((state) => state.openCart);
  const itemCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <Button variant="ghost" size="icon" aria-label="Ouvrir le panier" onClick={open} className="relative">
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-xs text-cream">
          {itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartTrigger;
