import Link from "next/link";

export const SiteFooter = () => {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <p className="font-display text-xl">Atelier Terracotta</p>
          <p className="text-sm text-cream/70">
            Pièces textiles personnalisables, confectionnées à la main dans notre atelier lyonnais.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Boutique</p>
          <ul className="space-y-1 text-cream/70">
            <li>
              <Link href="/catalog">Catalogue</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Légal</p>
          <ul className="space-y-1 text-cream/70">
            <li>
              <Link href="/legal/cgv">CGV</Link>
            </li>
            <li>
              <Link href="/legal/privacy">Confidentialité</Link>
            </li>
            <li>
              <Link href="/legal/mentions">Mentions légales</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Suivi</p>
          <p className="text-cream/70">Newsletter mensuelle avec nouveautés et coulisses.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-cream/20 bg-charcoal px-4 py-2 text-sm placeholder:text-cream/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            />
            <button
              type="submit"
              className="rounded-2xl bg-terracotta px-4 py-2 text-sm font-semibold text-cream transition hover:bg-terracotta-dark"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Atelier Terracotta. Tous droits réservés.
      </div>
    </footer>
  );
};
