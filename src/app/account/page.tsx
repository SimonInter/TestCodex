import { Shell } from "@/components/layout/shell";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/options";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-6 py-16 text-center">
          <h1 className="font-display text-3xl text-charcoal">Connectez-vous</h1>
          <p className="mt-4 text-sm text-charcoal/70">
            Accédez à vos commandes, adresses et retours.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-2xl bg-terracotta px-6 py-3 text-sm font-semibold text-cream"
          >
            Se connecter
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-4xl text-charcoal">Bonjour {session.user?.name ?? "!"}</h1>
        <p className="mt-2 text-sm text-charcoal/70">
          Retrouvez vos commandes, enregistrements d'adresses et retours.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-charcoal/10 bg-cream p-6">
            <h2 className="font-semibold text-charcoal">Commandes</h2>
            <p className="mt-2 text-sm text-charcoal/70">
              Suivi des commandes, téléchargements de factures, demandes de retour.
            </p>
          </section>
          <section className="rounded-2xl border border-charcoal/10 bg-cream p-6">
            <h2 className="font-semibold text-charcoal">Adresses</h2>
            <p className="mt-2 text-sm text-charcoal/70">
              Gérez vos adresses de livraison et de facturation.
            </p>
          </section>
        </div>
      </div>
    </Shell>
  );
}
