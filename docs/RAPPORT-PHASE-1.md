# Rapport — Phase 1 (scaffold, données, design system)

## Fichiers créés

- Projet Vite + React 18 + TS dans `the-green-man/`, dépendances `gsap`, `lenis`,
  `lucide-react`, `react-router-dom` installées.
- Arborescence complète `src/{components,sections,layout,pages,data,hooks,styles,assets/fonts}`,
  `public/images/{hero,voutes,feuillage,comptoir,scene,saisons,og}`, `docs/`.
- `src/data/etablissement.ts`, `carte.ts`, `evenements.ts`, `seo.ts` — typés, remplis
  uniquement avec les données du brief, placeholders explicites sinon.
- `src/hooks/{useLenis,useGsapContext,useReducedMotion,useMediaQuery,useScrollProgress}.ts`.
- `src/styles/{reset,tokens,typography,global}.css`.
- `src/components/PlaceholderImage.tsx` + `.css`.
- `src/assets/fonts/{fraunces,archivo}-variable.woff2` (auto-hébergées, sous-ensemble latin).
- `public/favicon.svg` (marque abstraite originale, pas un logo repris).
- `docs/SOURCES.md`, `docs/DESIGN.md`, `public/images/IMAGES.md`, `README.md`.
- `App.tsx` réécrit en vue d'échafaudage (données réelles, aucun texte factice) — le
  template Vite par défaut (logos React/Vite, compteur) a été entièrement supprimé.

## Décisions et pourquoi

- **Dossier dédié** (`C:\Users\kenny\the-green-man`) plutôt qu'à la racine du home, qui
  contient déjà d'autres projets similaires du même utilisateur.
- **Polices variables auto-hébergées** plutôt que 4 fichiers statiques par famille : Google
  sert le même binaire variable quelle que soit la instance de poids demandée dans l'URL
  css2 — un seul fichier par famille (~35 Ko chacun) suffit donc, avec `font-weight: 400 700`
  en plage sur le `@font-face`.
- **Arche en plein cintre (romane)**, pas gothique : détail non tranché par le brief, choisi
  par cohérence avec des voûtes de rez-de-chaussée/cave en pierre plutôt qu'une élévation
  gothique élancée, et par registre « chaud, habité » plutôt que solennel. Validé par
  l'utilisateur avant la suite.
- **Contrôle de contraste fait dès la Phase 1** (et non repoussé à la Phase 4) : le point de
  rupture annoncé dans le brief (ambre sur pierre) est confirmé côté texte sur fond clair —
  règle actée dans `docs/DESIGN.md` avant d'écrire le moindre composant, pour ne pas avoir à
  corriger des dizaines d'usages plus tard.
- **`etablissementVoisin` (« The Green Mama »)** gardé comme simple champ informatif dans
  `etablissement.ts`, pas de section dédiée : le lien capitalistique/commercial n'étant pas
  confirmé, une section entière serait une affirmation implicite non fondée.

## Ce qui marche

`npm install && npm run dev` démarre sans erreur ; la vue d'échafaudage affiche le nom,
l'accroche, la formule, l'adresse et le téléphone réels via `etablissement.ts`, avec les
polices et couleurs des tokens. Aucune chaîne de texte propre à l'établissement n'est en dur
hors de `src/data/`.

## Ce qui ne marche pas / n'existe pas encore

Header, Hero, Footer, pages légales, routing, SEO/JSON-LD, et toutes les sections de contenu
(Voûtes, Feuillage, Ardoise, Comptoir, Scène, Saisons, Pratique, Pasteur, Contact) — prévues
Phases 2 à 4. Le composant `Arch` (élément signature) n'est pas encore codé : sa géométrie
est spécifiée dans `docs/DESIGN.md` mais l'implémentation SVG arrive en Phase 2/3.

## `[[À COMPLÉTER]]` / `[[À VÉRIFIER]]` restants

Horaires (aucun trouvé), carte détaillée et vins/bières nommés, e-mail, toutes les données
société des mentions légales (raison sociale, SIRET, RCS, TVA, capital, directeur de
publication, hébergeur, licence de débit de boissons), confirmation du numéro de téléphone
relevé sur annuaire, lien capitalistique éventuel avec « The Green Mama ».

## Besoins pour avancer

1. Validation reçue sur palette / typographie / arche (Phase 1 validée).
2. Pour aller plus loin sur le réalisme du site : accès manuel à la page Facebook et/ou au
   site thegreenman.fr pour récupérer horaires, carte et programmation — je ne peux pas les
   collecter automatiquement.
3. Aucun autre blocage : je poursuis en Phase 2 (Header, Hero, Footer, pages légales,
   routing, SEO/JSON-LD) sauf avis contraire.
