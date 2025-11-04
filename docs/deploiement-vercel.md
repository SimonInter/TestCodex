# Mise en production : Vercel + Neon + DNS

1. **Préparer l'environnement**
   - Créez un compte Vercel, Neon (PostgreSQL managé) et Stripe.
   - Configurez les variables d'environnement dans Vercel (`STRIPE_SECRET_KEY`, `DATABASE_URL`, etc.).
2. **Base de données**
   - Provisionnez un projet Neon, récupérez l'URL de connexion et mettez-la dans Vercel.
   - Exécutez `pnpm prisma migrate deploy` sur Vercel (hook `vercel-build`).
3. **Stripe**
   - Configurez les webhooks dans le dashboard vers `https://votre-domaine/api/webhooks/stripe`.
   - Activez Apple Pay / Google Pay via Payment Request (domain registration).
4. **Cloudinary**
   - Ajoutez les credentials, limitez les transformations via un preset sécurisé.
5. **Sentry & logs**
   - Ajoutez `SENTRY_DSN` et installez le SDK Next.js (cf. docs Sentry).
   - Configurez un log drain Vercel (Datadog/Logtail) pour audit.
6. **DNS + SSL**
   - Ajoutez votre domaine dans Vercel, mettez à jour les enregistrements A/AAAA/CNAME.
   - Le SSL est automatique via Let's Encrypt.
7. **Vérifications**
   - Lancez `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`.
   - Exécutez Lighthouse (objectif ≥95). Optimisez si besoin (images, caching).
