# The Green Man — site vitrine

> Projet de démonstration non commandité. « The Green Man », sa marque et les contenus
> factuels le concernant appartiennent à leurs propriétaires respectifs ; ce dépôt n'est
> affilié à l'établissement en aucune manière.

Site vitrine pour The Green Man, bar-restaurant au 21 rue Pasteur, 25000 Besançon.
Vite + React 18 + TypeScript, GSAP/ScrollTrigger, Lenis, CSS moderne par composant (pas de
Tailwind, pas de CSS-in-JS). Direction artistique et sources des données : voir
`docs/DESIGN.md` et `docs/SOURCES.md`. Historique des quatre phases de construction :
`docs/RAPPORT-PHASE-1.md` à `RAPPORT-PHASE-4.md`.

## Installation

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # sert le build de production en local
npm run lint      # oxlint
```

Aucune variable d'environnement n'est nécessaire : le site est entièrement statique côté
client, sans backend, sans clé d'API.

## Où modifier quoi

### Les informations de l'établissement — `src/data/etablissement.ts`

Source unique de vérité pour tout ce qui concerne The Green Man : nom, adresse, téléphone,
description, horaires, services, moyens de paiement, mentions légales. **Un champ
`[[À COMPLÉTER]]` ou `null` signifie une donnée réelle manquante — ne jamais le remplacer par
une supposition, même plausible.** Voir `docs/SOURCES.md` pour l'origine et la fiabilité de
chaque donnée déjà renseignée.

Pour renseigner les horaires (aujourd'hui `null`) : remplacer la valeur de `horaires` par un
tableau de `JourHoraire` (un par jour de la semaine, `service`/`bar` en `null` si fermé ce
jour-là), puis passer `horairesStatut` à `'confirme'`. Le Footer et la section Contact
affichent automatiquement les horaires dès qu'ils existent — aucune autre modification requise.

### La carte — `src/data/carte.ts`

Vide par défaut (aucune carte fiable trouvée à la collecte). Tant qu'elle est vide, la section
Ardoise affiche les faits établis (`faitsEtablis`) et renvoie au téléphone/Facebook ; la
section Comptoir fait de même pour les boissons.

**Procédure pour l'alimenter :**
1. Ajouter des entrées à `carte.plats` (type `PlatCarte` : `id`, `nom`, `moment`
   `'matin' | 'midi' | 'soir'`, `prix` et `description` optionnels) et/ou à `carte.boissons`
   (type `BoissonCarte`).
2. Mettre à jour `dateReleve` avec la date ISO du relevé (ex. `'2026-09-01'`).
3. Rien d'autre à faire : dès que `carte.plats` (ou `carte.boissons`) contient au moins une
   entrée, Ardoise (ou Comptoir) bascule automatiquement de l'état « faits établis + renvoi »
   vers l'affichage de la vraie carte, groupée par moment de service.

### Les concerts — `src/data/evenements.ts`

Vide par défaut (programmation annoncée sur Facebook, jamais reprise ici sans confirmation).

**Procédure pour l'alimenter :** ajouter des entrées à `evenements` (type `Evenement` : `id`,
`titre`, `type`, `date` ISO, `heure`/`description` optionnels). Dès qu'il y a au moins une
entrée, la section Scène affiche la liste au lieu du renvoi Facebook — aucune autre
modification requise.

### Les images — `public/images/`

Voir `public/images/IMAGES.md` : chemin, sujet, ratio, dimensions et poids max de chaque photo
attendue. Tant qu'un fichier n'existe pas, `<PlaceholderImage>` l'affiche proprement (couleurs
des tokens + nom de fichier attendu) avec exactement les mêmes props qu'une future `<Image>`
réelle (`src`, `alt`, `width`, `height`, `sizes`, `priority`, `cover`).

**Pour remplacer un placeholder par une vraie photo :**
1. Déposer le fichier au chemin indiqué dans `IMAGES.md`, en AVIF, WebP et JPEG.
2. Dans le composant concerné, remplacer `<PlaceholderImage {...} />` par une balise
   `<picture>` (AVIF → WebP → JPEG) avec les mêmes `width`/`height`/`alt`, `loading="lazy"`
   sauf pour l'image `priority` (le Hero), et `decoding="async"`.

### Les animations

- Réglages globaux (durées, easing, seuil mobile) : `src/styles/tokens.css`
  (`--duration-reveal`, `--ease-arch`…) et `src/hooks/useMediaQuery.ts` (`MOBILE_QUERY`).
- Révélation simple au scroll : composant `src/components/Reveal.tsx`.
- Séquences chorégraphiées (Hero, Voûtes) : `gsap.context()` via le hook
  `src/hooks/useGsapContext.ts` — jamais de `gsap.context()` en dehors de ce hook, il gère le
  nettoyage automatique.
- Scroll fluide + synchronisation ScrollTrigger : `src/hooks/useLenis.ts`, appelé une seule
  fois dans `src/pages/Home.tsx`.
- Toute animation doit se dégrader sous `prefers-reduced-motion` (hook `useReducedMotion`) et
  sur mobile (`MOBILE_QUERY`) — voir `docs/DESIGN.md`, section Mouvement.

### Couleurs et typographies — `src/styles/tokens.css`

Toutes les couleurs, tailles de texte, espacements et rayons du site sont des variables CSS
dans ce fichier. Les valeurs et leur justification (notamment le choix du vert mousse et le
contrôle de contraste de l'ambre) sont documentées dans `docs/DESIGN.md`. Les polices
(Fraunces, Archivo) sont auto-hébergées dans `src/assets/fonts/` et déclarées dans
`src/styles/typography.css`.

## L'arche — élément signature

Un seul composant, `src/components/Arch.tsx`, réutilisé partout (Hero, Voûtes, Footer,
Pratique). Il prend une prop `progress` (0 à 1) ou `variant` (`'fermee' | 'entrouverte' |
'ouverte'`). Voir `docs/DESIGN.md` §3 pour la construction géométrique complète avant d'y
toucher.

## Ce qui manque encore (à ne jamais deviner)

Horaires, carte détaillée, vins/bières nommés, e-mail, raison sociale, SIRET, RCS, n° TVA,
capital social, directeur de publication, hébergeur, licence de débit de boissons,
confirmation du numéro de téléphone. Tous ces champs sont des obligations légales ou
factuelles à faire remplir par l'établissement avant mise en ligne réelle — voir
`docs/RAPPORT-PHASE-4.md` pour le détail complet.

## Analytics / réseaux sociaux (non implémentés)

Aucun tracker, aucune analytics, aucune police distante, aucun widget Facebook/Instagram dans
ce projet — donc pas de bandeau cookies. Si un jour ajoutés :
- **Analytics** : privilégier une solution sans cookie tiers (ex. Plausible, Fathom) pour
  éviter un bandeau de consentement ; sinon, un bandeau RGPD conforme devient obligatoire avant
  tout dépôt de cookie de mesure d'audience non essentiel.
- **Flux social (Facebook/Instagram embed)** : dépose des cookies tiers dès le chargement du
  widget → bandeau de consentement obligatoire également. Préférer un simple lien sortant
  (déjà en place) plutôt qu'un embed, sauf besoin explicite.

## Déploiement

Site 100 % statique après `npm run build` (dossier `dist/`). Le routing (`react-router-dom`,
mode navigateur) nécessite une redirection SPA côté hébergeur, déjà fournie :

- **Netlify** : `public/_redirects` (copié tel quel dans `dist/` au build) redirige toute
  route vers `index.html`. Commande de build : `npm run build`, dossier de publication :
  `dist`.
- **Vercel** : `vercel.json` à la racine fait la même chose via `rewrites`. Framework preset :
  Vite ; commande de build et dossier de sortie détectés automatiquement.

Dans les deux cas, aucune variable d'environnement à configurer.
