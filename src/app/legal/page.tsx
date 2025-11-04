import { Shell } from "@/components/layout/shell";

const legalSections = [
  {
    title: "Conditions Générales de Vente",
    slug: "cgv",
    description: "Commandes, paiements, livraisons, retours."
  },
  {
    title: "Politique de confidentialité",
    slug: "privacy",
    description: "Traitement des données personnelles et RGPD."
  },
  {
    title: "Mentions légales",
    slug: "mentions",
    description: "Informations sur l'éditeur et l'hébergeur."
  }
];

export default function LegalIndexPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-4xl text-charcoal">Informations légales</h1>
        <p className="mt-4 text-sm text-charcoal/70">
          Retrouvez nos conditions générales, notre politique de confidentialité et toutes les mentions
          réglementaires pour une commande sereine.
        </p>
        <div className="mt-10 space-y-6">
          {legalSections.map((section) => (
            <a
              key={section.slug}
              href={`/legal/${section.slug}`}
              className="block rounded-2xl border border-charcoal/10 bg-cream p-6 transition hover:border-terracotta"
            >
              <h2 className="font-display text-2xl text-charcoal">{section.title}</h2>
              <p className="text-sm text-charcoal/70">{section.description}</p>
            </a>
          ))}
        </div>
      </div>
    </Shell>
  );
}
