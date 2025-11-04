import Image from "next/image";

const StorySection = () => (
  <section className="bg-cream py-20">
    <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-charcoal">L'atelier</h2>
        <p className="text-base text-charcoal/80">
          Atelier Terracotta est né d'une passion pour les matières naturelles et les finitions
          impeccables. Chaque pièce est découpée, brodée et assemblée à la main, avec la possibilité de
          choisir vos tissus, coloris, doublures et personnalisations.
        </p>
        <p className="text-base text-charcoal/80">
          Nous sourçons des tissus européens certifiés Oeko-Tex et travaillons à la commande afin de
          limiter les stocks et produire de façon responsable. Un délai de confection personnalisé est
          affiché selon vos options.
        </p>
      </div>
      <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-soft">
        <Image
          src="https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/workshop.jpg"
          alt="Atelier de confection"
          fill
          className="object-cover"
        />
      </div>
    </div>
  </section>
);

export default StorySection;
