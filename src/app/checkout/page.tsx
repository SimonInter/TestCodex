import CheckoutForm from "@/features/checkout/checkout-form";
import { Shell } from "@/components/layout/shell";

export default function CheckoutPage() {
  return (
    <Shell>
      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <CheckoutForm />
      </div>
    </Shell>
  );
}
