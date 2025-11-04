import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-terracotta/15 px-4 py-1 text-xs uppercase tracking-[0.3em] text-terracotta">
            Fait main en France
          </span>
          <h1 className="font-display text-4xl leading-tight text-charcoal md:text-5xl">
            Sublimez votre intérieur avec des pièces textiles personnalisées.
          </h1>
          <p className="max-w-xl text-base text-charcoal/80">
            Choisissez vos tissus, couleurs et finitions pour créer des objets uniques : housses de
            coussin, trousses de toilette et accessoires confectionnés à la commande dans notre atelier.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/product/housse-coussin-terracotta">Personnaliser</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/catalog">Explorer le catalogue</Link>
            </Button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-soft">
            <Image
              src="https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/hero-cushion.jpg"
              alt="Housse de coussin terracotta personnalisée"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
