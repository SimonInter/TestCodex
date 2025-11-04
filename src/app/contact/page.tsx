import { Shell } from "@/components/layout/shell";
import ContactForm from "@/components/commerce/contact-form";

export default function ContactPage() {
  return (
    <Shell>
      <div className="mx-auto grid max-w-4xl gap-10 px-6 py-16 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="font-display text-4xl text-charcoal">Entrons en contact</h1>
          <p className="text-sm text-charcoal/70">
            Vous avez un projet sur-mesure, une demande de devis ou besoin d'aide pour votre commande ?
            Nous répondons sous 48h.
          </p>
          <div className="rounded-2xl bg-sand p-4 text-sm text-charcoal/80">
            <p>Atelier Terracotta</p>
            <p>12 rue des Artisans, 69000 Lyon</p>
            <p>hello@atelier-terracotta.fr</p>
            <p>+33 6 00 00 00 00</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </Shell>
  );
}
