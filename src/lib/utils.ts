import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
});

export const formatPrice = (value: number) => currencyFormatter.format(value / 100);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
