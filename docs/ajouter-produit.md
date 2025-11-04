# Guide : Ajouter un produit personnalisable

1. **Créer la fiche produit** dans Prisma (Admin > Produits) ou via `prisma.product.create`.
   - Renseignez `name`, `slug`, `basePrice`, `heroImage`, `leadTimeDays`.
   - Liez le produit à une ou plusieurs collections.
2. **Définir les options** (`Option` + `OptionValue`).
   - Types disponibles : `select`, `text`, `boolean`, `file`, `color`.
   - Configurez `order` pour définir l'affichage.
   - Ajoutez `imageOverlay` pour superposer visuellement la personnalisation.
3. **Créer les variantes** (`Variant`).
   - `options` doit contenir la combinaison (JSON). Exemple : `{ "Taille": "M", "Tissu": "lin" }`.
   - Renseignez `stock` pour l'alerte disponibilité.
4. **Synchroniser la recherche**.
   - Exécutez `pnpm run search:index` pour pousser le produit vers Meilisearch/Algolia.
5. **Tester la personnalisation**.
   - Vérifiez l'aperçu live sur `/product/[slug]`.
   - Ajoutez au panier et réalisez un paiement test Stripe.
