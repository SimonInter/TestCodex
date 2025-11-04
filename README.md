# Atelier Terracotta

Atelier Terracotta est une boutique e-commerce Next.js dédiée aux créations textiles artisanales et personnalisables. Le projet fournit une expérience complète : personnalisation avancée, aperçu en direct, paiement Stripe, administration et documentation pour la mise en production.

## Sommaire

- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Design system](#design-system)
- [Fonctionnalités](#fonctionnalités)
- [Tests](#tests)
- [Documentation produit](#documentation-produit)
- [Déploiement](#déploiement)

## Architecture

- **Framework** : Next.js 14 (App Router, React Server Components)
- **Langage** : TypeScript
- **UI** : Tailwind CSS + composants shadcn/ui adaptés à la direction artistique terracotta
- **État client** : Zustand, React Hook Form + Zod
- **Base de données** : PostgreSQL avec Prisma
- **Auth** : NextAuth (provider email prêt, OAuth à ajouter)
- **Paiement** : Stripe Payment Intents + webhooks
- **Médias** : Cloudinary (intégration via overlays configurables)
- **Recherche** : endpoints prêts pour Meilisearch/Algolia (adapter dans `src/server/search`)
- **Emailing** : Resend (MJML templates à compléter dans `src/server/email`)
- **Observabilité** : instrumentation Sentry à ajouter via middleware (emplacements commentés)

## Prérequis

- Node.js 18+
- pnpm (recommandé) ou npm/yarn
- Base PostgreSQL (local via Docker ou Neon/Supabase)
- Compte Stripe (mode test)
- Compte Cloudinary & Resend (mode test)
- Optionnel : Meilisearch ou Algolia

## Installation

```bash
pnpm install
pnpm db:generate
pnpm db:migrate --name init
pnpm db:seed
pnpm dev
```

L'application est disponible sur `http://localhost:3000`.

## Scripts

| Commande | Description |
| --- | --- |
| `pnpm dev` | Démarre le serveur Next.js en développement |
| `pnpm build` | Build de production |
| `pnpm start` | Démarre en mode production |
| `pnpm lint` | Vérifie le linting ESLint |
| `pnpm typecheck` | Vérifie les types TypeScript |
| `pnpm test` | Lance les tests unitaires Vitest |
| `pnpm test:e2e` | Lance les tests Playwright |
| `pnpm db:seed` | Insère les données de démonstration |
| `pnpm search:index` | Synchronise le catalogue vers Meilisearch/Algolia |
| `pnpm tsx scripts/import-products.ts <fichier.csv>` | Import CSV de produits personnalisés |

## Configuration

1. Copiez `.env.example` vers `.env.local` et complétez :
   - `DATABASE_URL` : chaîne PostgreSQL
   - `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`
   - `NEXTAUTH_SECRET` / `NEXTAUTH_URL`
   - Identifiants SMTP Resend (ou autre provider)
   - Identifiants Cloudinary
2. Exécutez `pnpm db:migrate` puis `pnpm db:seed`.
3. Démarrez `pnpm dev`.

### Stripe

- Webhook local via `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Les paiements se font avec Stripe Elements (mock côté client) ou Payment Request (à activer).

### Cloudinary

- Les overlays configurés dans la seed sont utilisés pour l'aperçu live.
- Ajoutez vos transformations sécurisées via signatures côté serveur (`src/server/media` à compléter).

## Design system

- Palette terracotta (terracotta, terracotta-dark, sand, cream, charcoal, sage)
- Typographies : Inter (UI), Playfair Display (titres)
- Composants shadcn adaptés : boutons, cartes produits, formulaires
- Focus states accessibles (WCAG 2.1 AA)

## Fonctionnalités

- Accueil avec best-sellers dynamiques
- Catalogue avec filtres server-side
- Page produit avec configurateur React Hook Form + aperçu Framer Motion + prix dynamique
- Panier slide-over persisté (Zustand)
- Checkout Stripe (server action + endpoint API)
- Recherche instantanée (endpoint `GET /api/search`)
- Pages légales, FAQ, contact, stories
- Tableau de bord admin (liste produits, options, variantes)
- SEO technique : sitemap, robots, metadata OG/Twitter, JSON-LD à compléter
- RGPD : bannière de consentement, suppression/export à implémenter dans `src/server/user`

## Tests

- Vitest configuré (ajouter des tests dans `src/tests`)
- Playwright prêt pour les scénarios e2e (cf. `playwright.config.ts` à créer)

## Documentation produit

Les guides sont disponibles dans `docs/` :

- `docs/ajouter-produit.md`
- `docs/creer-option-apercu.md`
- `docs/integration-colissimo.md`
- `docs/migration-meilisearch-algolia.md`
- `docs/deploiement-vercel.md`

## Déploiement

- Prévu sur Vercel (configuration dans `vercel.json` à ajouter)
- DB : Neon/Supabase (migrations Prisma)
- Recherche : Meilisearch Cloud ou Algolia
- Monitoring : branchez Sentry (`SENTRY_DSN`) + log drains Vercel
- Analytics : Umami (script conditionné au consentement)
