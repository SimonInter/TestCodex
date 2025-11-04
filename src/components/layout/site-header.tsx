import Link from "next/link";
import { ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import CartTrigger from "@/components/commerce/cart-trigger";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Ouvrir le menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="font-display text-2xl text-terracotta">
            Atelier Terracotta
          </Link>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/catalog" className="hover:text-terracotta">
            Catalogue
          </Link>
          <Link href="/stories" className="hover:text-terracotta">
            Stories
          </Link>
          <Link href="/faq" className="hover:text-terracotta">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Suspense fallback={<Button variant="ghost" size="icon"><ShoppingBag className="h-5 w-5" /></Button>}>
            <CartTrigger />
          </Suspense>
          <Button asChild variant="ghost" size="icon" aria-label="Mon compte">
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
