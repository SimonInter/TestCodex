"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProductCustomization } from "@/types/product";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization: ProductCustomization;
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  reset: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
          isOpen: true
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity
                }
              : item
          )
        })),
      reset: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false })
    }),
    {
      name: "atelier-cart",
      storage: typeof window !== "undefined" ? createJSONStorage(() => localStorage) : undefined
    }
  )
);

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.quantity, 0);

export const useCartTotals = () => {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return { total, itemCount };
};
