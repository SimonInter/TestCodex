import { Suspense } from "react";
import Hero from "@/components/commerce/hero";
import BestSellers from "@/components/commerce/best-sellers";
import StorySection from "@/components/commerce/story-section";
import { Shell } from "@/components/layout/shell";

export default function HomePage() {
  return (
    <Shell>
      <Hero />
      <Suspense fallback={<div className="mt-20 text-center">Chargement des best-sellers...</div>}>
        <BestSellers />
      </Suspense>
      <StorySection />
    </Shell>
  );
}
