import { Shell } from "@/components/layout/shell";
import AdminProducts from "@/components/admin/admin-products";

export default function AdminDashboardPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="font-display text-4xl text-charcoal">Tableau de bord</h1>
        <p className="mt-2 text-sm text-charcoal/70">
          Gérez votre catalogue, vos commandes et vos options de personnalisation.
        </p>
        <AdminProducts />
      </div>
    </Shell>
  );
}
