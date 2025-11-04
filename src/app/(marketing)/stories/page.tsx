import { Shell } from "@/components/layout/shell";

const stories = [
  {
    title: "Dans les coulisses de la broderie",
    excerpt: "Découvrez comment nous brodons vos monogrammes avec précision et douceur.",
    date: "2024-03-01"
  },
  {
    title: "Palette terracotta : nos inspirations",
    excerpt: "Voyage entre Marrakech et Toscane pour imaginer nos collections.",
    date: "2024-02-12"
  }
];

export default function StoriesPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-4xl text-charcoal">Stories</h1>
        <p className="mt-4 text-sm text-charcoal/70">
          Un regard sur l'atelier, nos matières et les histoires derrière chaque pièce.
        </p>
        <div className="mt-10 space-y-6">
          {stories.map((story) => (
            <article
              key={story.title}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 transition hover:border-terracotta"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-terracotta">
                {new Date(story.date).toLocaleDateString("fr-FR")}
              </p>
              <h2 className="mt-2 font-display text-2xl text-charcoal">{story.title}</h2>
              <p className="mt-2 text-sm text-charcoal/70">{story.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </Shell>
  );
}
