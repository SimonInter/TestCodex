import { Shell } from "@/components/layout/shell";
import { CatalogGrid } from "@/components/commerce/catalog-grid";
import Filters from "@/components/commerce/filters";

export default function CatalogPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row">
        <aside className="w-full max-w-xs flex-shrink-0">
          <Filters searchParams={searchParams} />
        </aside>
        <div className="flex-1">
          <CatalogGrid searchParams={searchParams} />
        </div>
      </div>
    </Shell>
  );
}
