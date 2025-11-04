import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/layout/analytics";
import { cookies } from "next/headers";
import ConsentBanner from "@/components/layout/consent-banner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-terracotta.example"),
  title: {
    default: "Atelier Terracotta",
    template: "%s | Atelier Terracotta"
  },
  description:
    "Créations textiles artisanales personnalisables : housses de coussin, trousses et accessoires." ,
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Atelier Terracotta",
    description:
      "Créations textiles artisanales personnalisables : housses de coussin, trousses et accessoires.",
    url: "https://atelier-terracotta.example",
    siteName: "Atelier Terracotta",
    images: [{ url: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/hero.jpg" }],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@atelierterracotta"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const consent = cookieStore.get("consent:analytics")?.value === "true";

  return (
    <html lang="fr" className="scroll-smooth bg-cream">
      <body
        className={cn(
          "min-h-screen bg-cream text-charcoal",
          inter.variable,
          playfair.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster richColors closeButton />
          <Analytics consent={consent} />
          <ConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
