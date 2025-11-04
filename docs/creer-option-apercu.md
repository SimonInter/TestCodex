# Guide : Créer une option et lier l'aperçu visuel

1. **Définir l'option dans Prisma** (`Option`).
   - `type` = `select` pour bénéficier des overlays.
   - `config` peut inclure `{ "maxLength": 12 }` pour limiter un texte.
2. **Ajouter les valeurs** (`OptionValue`).
   - Définissez `imageOverlay` avec l'URL Cloudinary du calque transparent.
   - Ajoutez `priceImpact` si la valeur modifie le tarif.
3. **Uploader les calques**.
   - Utilisez Cloudinary (`/atelier/personnalisations/<option>/<valeur>.png`).
   - Les images doivent partager les mêmes dimensions que l'image de base.
4. **Mettre à jour la seed** (`prisma/seed.ts`).
   - Ajoutez l'option, les valeurs et les URLs d'overlay.
5. **Tester l'aperçu**.
   - Rendez-vous sur `/product/[slug]` et sélectionnez les valeurs : les calques doivent se superposer immédiatement (<150 ms).
