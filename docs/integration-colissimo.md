# Brancher Colissimo/Chronopost

1. **Créer un compte La Poste** pour accéder aux APIs Colissimo/Chronopost.
2. **Configurer les credentials** dans `.env.local` :
   - `COLISSIMO_PARTNER_KEY`
   - `COLISSIMO_PASSWORD`
3. **Implémenter le calcul de tarif** :
   - Ajoutez un service dans `src/server/shipping/tariffs.ts`.
   - Récupérez les poids/dimensions depuis les personnalisations (`Variant` + `Option`).
4. **Créer le point d'intégration checkout** :
   - Dans `src/features/checkout/checkout-form.tsx`, ajoutez un select pour le transporteur.
   - Côté serveur, appelez `getShippingRates(address, items)`.
5. **Générer les étiquettes** :
   - Endpoint dédié `POST /api/shipping/labels` qui contacte l'API Colissimo et renvoie un PDF.
6. **Suivi d'expédition** :
   - Stockez le numéro dans `Shipment.trackingNumber`.
   - Ajoutez une page de suivi dans l'espace client (`/account/orders/[id]`).
