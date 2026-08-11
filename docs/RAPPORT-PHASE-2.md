# Rapport — Phase 2 (Header, Hero, Footer, pages légales, routing, SEO)

## Fichiers créés

- Composants : `Button`, `Arch` + `LeafMark` (élément signature, implémenté), `Reveal`, `Grain`,
  `Cursor`, `Nav`, `MobileMenu`, `Seo`, `PlaceholderImage` (ajout du mode `cover` pour le fond
  plein cadre du Hero).
- Layout : `Header` (état scroll, inversion de contraste, déclencheur menu mobile, barre d'appel
  fixe mobile), `Footer`, `layout/navItems.ts`.
- Section : `Hero` (séquence d'apparition GSAP puis ouverture de la première arche).
- Pages : `Home`, `MentionsLegales`, `Confidentialite` (+ `LegalPage.css` partagé).
- Routing : `react-router-dom` (`BrowserRouter` dans `main.tsx`, `Routes` dans `App.tsx`).
- SEO : `data/seo.ts` déjà écrit en Phase 1, composant `Seo` sans dépendance externe (pas de
  react-helmet — gestion du `<head>` en `useEffect`), `public/robots.txt`, `public/sitemap.xml`.

## Décisions et pourquoi

- **`Seo` maison plutôt que react-helmet-async** : un seul besoin (titre, meta, OG, JSON-LD
  conditionnel), pas de SSR — une dépendance de plus n'était pas justifiable.
- **JSON-LD sans `aggregateRating`/`geo`/`openingHoursSpecification`**, conforme au brief ;
  `telephone` inclus malgré le statut `a_verifier` car ce numéro est déjà le CTA principal
  affiché partout sur le site (Hero, Header, Footer) — l'exclure du JSON-LD tout en l'affichant
  en clair n'aurait pas de sens.
- **Menu mobile en portail React vers `#root`** (pas `document.body`) — voir bug ci-dessous.

## Trois bugs réels trouvés et corrigés par QA visuelle (Playwright + Edge headless)

`tsc` et `npm run build` ne les auraient jamais révélés — je les documente parce qu'ils auraient
cassé le site en usage réel :

1. **`useGsapContext` : `ReferenceError` bloquant tout `<Hero>`.** `gsap.context(() => setup(ctx, node), node)`
   lisait `ctx` avant la fin de son assignation (TDZ). Corrigé en utilisant l'argument que GSAP
   passe lui-même à son callback plutôt que la variable externe.
2. **L'arche ne s'ouvrait qu'à moitié, même à `progress=1`.** `vector-effect: non-scaling-stroke`
   sur `.arch__arc` faisait calculer `stroke-dasharray`/`dashoffset` dans l'espace transformé par
   le CTM (mise à l'échelle du viewBox) plutôt que dans les unités locales du path — confirmé en
   isolant la géométrie brute (correcte) puis en testant plusieurs valeurs de dasharray. Retiré
   uniquement sur `.arch__arc` (piliers/linteau, sans dash, le gardent).
3. **Le menu plein écran mobile masquait la barre d'en-tête et son bouton de fermeture.**
   `.site-header` (position fixed + z-index) crée son propre contexte d'empilement ; `MobileMenu`,
   rendu comme enfant du `<header>`, y restait piégé et son z-index ne se comparait qu'à celui de
   la barre (auto), pas au reste de la page. Un premier essai de portail vers `document.body` a
   révélé un second piège : `#root` porte `isolation: isolate` (reset.css), donc sortir de `#root`
   fait perdre tout le bénéfice du `z-index` interne du header. Portail vers `#root` (pas `body`)
   : réglé.

Les trois ont été vérifiés par capture d'écran avant/après (desktop 1440px et mobile 390px), pas
seulement par lecture de code.

## Ce qui marche

`npm run build`, `npm run lint` et `tsc -b` passent sans erreur. Bundle JS gzippé : 109,5 Ko
(budget 180 Ko pour tout le site) — la marge se réduit avec `react-router-dom` + cœur GSAP ; à
surveiller en Phase 4 quand les sections lourdes arriveront (import dynamique prévu par le brief).
Header (scroll compact, menu mobile avec trap de focus/Échap/scroll verrouillé), Hero (séquence +
arche), Footer (dégradation propre horaires absents), pages légales (`[[À COMPLÉTER]]` visibles),
routing testés visuellement.

## Ce qui ne marche pas / n'existe pas encore

Voûtes, Feuillage, Ardoise, Comptoir, Scène, Saisons, Pratique, Pasteur, Contact (Phases 3–4).
Le Footer suit directement le Hero pour l'instant — l'arche aplatie du Footer déborde donc un peu
dans le bas du Hero en l'absence des sections intermédiaires ; se résorbe naturellement en Phase 3.
Pas encore de `<picture>` réel (Phase 4, actuellement `PlaceholderImage` partout, y compris le
LCP du Hero).

## `[[À COMPLÉTER]]` / `[[À VÉRIFIER]]` restants

Inchangé depuis la Phase 1 (horaires, carte, e-mail, données société des mentions légales,
confirmation du téléphone, lien avec « The Green Mama ») — visibles et correctement affichés
dans le Footer et `/mentions-legales`.

## Besoins pour avancer

Aucun blocage. Je poursuis en Phase 3 (Voûtes, Feuillage, Ardoise, Comptoir) sauf avis contraire.
