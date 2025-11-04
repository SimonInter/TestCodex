import { Shell } from "@/components/layout/shell";

const faqs = [
  {
    question: "Quels sont les délais de confection ?",
    answer:
      "Chaque pièce est fabriquée à la commande. Comptez 7 à 10 jours ouvrés selon les options (broderie, patch)."
  },
  {
    question: "Comment entretenir les tissus ?",
    answer:
      "Lavage délicat à 30°C, séchage naturel. Les housses brodées doivent être repassées sur l'envers."
  },
  {
    question: "Proposez-vous des commandes professionnelles ?",
    answer:
      "Oui, contactez-nous pour les projets de décoration, cadeaux d'entreprise ou collaborations."
  }
];

export default function FAQPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl text-charcoal">Questions fréquentes</h1>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-charcoal/10 bg-cream p-6">
              <summary className="cursor-pointer text-lg font-semibold text-charcoal">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-charcoal/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Shell>
  );
}
