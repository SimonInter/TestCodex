import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <h1 className="font-display text-5xl text-terracotta">Page introuvable</h1>
      <p className="mt-4 max-w-md text-sm text-charcoal/70">
        La page que vous recherchez a peut-être été déplacée ou n'existe plus. Revenez à l'accueil pour
        découvrir nos créations personnalisables.
      </p>
      <Link href="/" className="mt-6 rounded-2xl bg-terracotta px-6 py-3 text-sm font-semibold text-cream">
        Retour à l'accueil
      </Link>
    </div>
  );
}
