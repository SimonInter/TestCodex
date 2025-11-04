# Passer de Meilisearch à Algolia

1. **Abstraire la couche de recherche**
   - Utilisez `src/server/search/indexer.ts` (à créer) pour centraliser les appels.
2. **Meilisearch**
   - Index actuel : `products`
   - Champs : `id`, `name`, `slug`, `description`, `categories`, `price`
3. **Algolia**
   - Créez une application et une clé API `ALGOLIA_API_KEY` avec droits d'écriture.
   - Définissez l'index `products` avec les mêmes attributs.
4. **Adapter l'indexeur**
   - Implémentez `syncProductsToAlgolia` utilisant `algoliasearch` (déjà installé).
   - Ajoutez un script `pnpm run search:sync-algolia` dans `package.json`.
5. **Mettre à jour les endpoints**
   - `GET /api/search` doit interroger Algolia via recherche full-text.
   - Conservez Meilisearch en fallback (feature flag `SEARCH_DRIVER`).
6. **Mettre à jour la documentation**
   - Mentionnez le nouveau driver dans README + `.env.example` (`ALGOLIA_APP_ID`).
