import Link from "next/link";
import { prisma } from "@/server/prisma/client";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AdminProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      options: true,
      variants: true
    }
  });

  return (
    <section className="mt-10 space-y-4 rounded-2xl border border-charcoal/10 bg-cream p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-charcoal">Produits</h2>
        <Button asChild>
          <Link href="/admin/products/new">Ajouter un produit</Link>
        </Button>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl border border-charcoal/10 bg-sand p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-charcoal">{product.name}</p>
                <p className="text-xs text-charcoal/60">{product.variants.length} variantes</p>
              </div>
              <div className="text-sm font-semibold text-charcoal">{formatPrice(product.basePrice)}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-charcoal/70">
              {product.options.map((option) => (
                <span key={option.id} className="rounded-full bg-cream px-3 py-1">
                  {option.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminProducts;
