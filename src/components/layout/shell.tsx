import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/commerce/cart/drawer";

export const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
};
