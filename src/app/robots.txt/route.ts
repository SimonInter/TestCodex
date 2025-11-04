export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://atelier-terracotta.example/sitemap.xml`,
    {
      headers: { "Content-Type": "text/plain" }
    }
  );
}
