# Sources des données factuelles — The Green Man

Consultées le 10 août 2026. Aucune donnée de ce site ne provient d'une source hors de cette liste.
Le site officiel (thegreenman.fr) et la page Facebook (facebook.com/Thegreenmanbar) bloquent la
collecte automatisée : ils n'ont donc **pas** pu servir de source directe, malgré leur statut de
référence primaire logique. C'est la cause principale des champs `[[À COMPLÉTER]]`.

## Fiches consultées

| Source | Fiabilité | Ce qu'elle a fourni |
|---|---|---|
| Office de tourisme de Besançon, fiche établissement (mise à jour 2 janvier 2026) | **Haute** — fiche officielle, alimentée en partie par l'établissement lui-même | Description officielle de l'établissement, services et équipements (wifi, animaux, PMR, anglais parlé, terrasse, bar, cheminée, Bottin Gourmand), moyens de paiement, situation géographique (boucle du Doubs, proximité Palais de Justice, parking Mairie) |
| Franche-Comté Tourisme, fiche établissement (saisie par l'office de tourisme) | **Haute** — dérivée de la fiche officielle ci-dessus | Recoupement des mêmes informations, aucune donnée supplémentaire retenue |
| Petit Futé, fiche The Green Man | **Moyenne** — guide édité, ton journalistique, non déclaratif de l'établissement | Description de l'ambiance et de la vie du lieu (habitués, canapé, soirées concert, soirées fondue, projections de rugby, repas à partager) — texte reformulé et attribué dans `etablissement.ts` (`vieDuLieu.source`) |
| Annuaires de bars / pages professionnelles génériques | **Basse à moyenne** — numéro de téléphone recoupé sur plusieurs annuaires mais jamais confirmé par une page officielle de l'établissement | Numéro de téléphone 03 81 50 99 59, marqué `statut: 'a_verifier'` dans `etablissement.ts` |
| Page Facebook officielle (facebook.com/Thegreenmanbar) | Source primaire mais **inaccessible** à la collecte automatisée | Aucune donnée récupérée. Contient probablement horaires, carte, programmation de concerts et photos réelles — à consulter manuellement |
| Site officiel thegreenman.fr | Source primaire mais **inaccessible** à la collecte automatisée | Aucune donnée récupérée |

## Ce qui n'a explicitement AUCUNE source

Ces champs restent `null` ou `[[À COMPLÉTER]]` dans `src/data/etablissement.ts` — ne jamais les
déduire d'un agrégateur d'avis, d'une IA générative ou d'une estimation "raisonnable" :

- Horaires jour par jour (service et bar)
- Carte détaillée (plats nommés, prix)
- Vins et bières nommés
- Adresse e-mail
- Raison sociale, forme juridique, SIRET, RCS, n° TVA, capital social
- Directeur de publication, hébergeur, licence de débit de boissons
- Lien capitalistique ou commercial avec « The Green Mama »

## Règle de non-substitution

Aucune note, aucun avis, aucun agrégateur (Google, TripAdvisor, etc.) n'a été utilisé comme source,
même à titre d'inspiration pour un ton ou un chiffre. Le site n'affiche aucune note ni
`aggregateRating`, conformément à la consigne.
