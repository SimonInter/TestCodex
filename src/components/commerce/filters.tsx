import { prisma } from "@/server/prisma/client";
import Link from "next/link";

interface FiltersProps {
  searchParams: Record<string, string | string[]>;
}

const Filters = async ({ searchParams }: FiltersProps) => {
  const categories = await prisma.collection.findMany({
    select: { id: true, name: true, slug: true }
  });

  const activeCategory = searchParams.category as string | undefined;

  return (
    <aside className="space-y-6 rounded-2xl border border-charcoal/10 bg-cream p-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">Catégories</h2>
        <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
          <li>
            <Link
              href="/catalog"
              className={!activeCategory ? "font-semibold text-charcoal" : "hover:text-terracotta"}
            >
              Toutes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/catalog?category=${category.slug}`}
                className={
                  activeCategory === category.slug ? "font-semibold text-charcoal" : "hover:text-terracotta"
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">Prix</h2>
        <div className="mt-4 space-y-2 text-sm text-charcoal/80">
          <Link href="/catalog?minPrice=0&maxPrice=10000" className="hover:text-terracotta">
            Tous les prix
          </Link>
          <Link href="/catalog?minPrice=0&maxPrice=15000" className="hover:text-terracotta">
            Jusqu'à 150€
          </Link>
          <Link href="/catalog?minPrice=15000&maxPrice=30000" className="hover:text-terracotta">
            150€ - 300€
          </Link>
          <Link href="/catalog?minPrice=30000" className="hover:text-terracotta">
            Plus de 300€
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
