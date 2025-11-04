import { Shell } from "@/components/layout/shell";

export default function LegalPage() {
  return (
    <Shell>
      <div className="prose mx-auto max-w-4xl px-6 py-16 prose-headings:font-display prose-headings:text-charcoal prose-p:text-charcoal/80">
        <h1 className="text-4xl">Section légale</h1>
        <p>
          Ce contenu sert de base pour les obligations légales. Remplacez-le par vos conditions
          personnalisées avant mise en production.
        </p>
        <h2>Engagements</h2>
        <p>
          Nous nous engageons à respecter les réglementations françaises et européennes concernant la
          vente à distance, la protection des données personnelles et la transparence sur nos produits
          artisanaux.
        </p>
        <h2>Coordonnées</h2>
        <p>Atelier Terracotta — 12 rue des Artisans, 69000 Lyon, France.</p>
      </div>
    </Shell>
  );
}
