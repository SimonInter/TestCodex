import { prisma } from "@/server/prisma/client";

export async function GET() {
  const products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } });

  const urls = [
    "https://atelier-terracotta.example/",
    "https://atelier-terracotta.example/catalog",
    "https://atelier-terracotta.example/faq",
    "https://atelier-terracotta.example/contact"
  ]
    .concat(products.map((product) => `https://atelier-terracotta.example/product/${product.slug}`))
    .map((loc) => `<url><loc>${loc}</loc></url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
