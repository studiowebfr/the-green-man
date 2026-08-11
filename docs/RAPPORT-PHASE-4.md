# Rapport — Phase 4 (Scène, Saisons, Pratique, Pasteur, Contact) + clôture

## Fichiers créés

- `sections/Scene`, `Saisons`, `Pratique`, `Pasteur`, `Contact` (+ `.css` chacune).
- `data/etablissement.ts` : `vieDuLieu` éclaté en `journee`/`soiree`/`saisons` (getter `texte`
  conservé pour compatibilité) pour alimenter Scène et Saisons sans dupliquer de texte.
- `public/_redirects` (Netlify) et `vercel.json` (Vercel) pour le routing SPA.
- README définitif, `docs/RAPPORT-PHASE-4.md` (ce fichier).

## Décisions et pourquoi

- **Saisons sans pin GSAP** : bascule via `useScrollProgress` (léger, pas de
  `gsap.context()`) plutôt qu'une séquence pinnée comme Voûtes — deux ambiances qui se
  répondent n'ont pas besoin d'un verrouillage du scroll, juste d'un parallax discret.
- **Pratique réutilise `Arch`** comme cadre d'icône (`variant="ouverte"`, petite taille) —
  conforme à `docs/DESIGN.md` (« cadre des groupes d'icônes de Pratique »), pas de nouveau
  motif décoratif introduit.
- **Pasteur en SVG inline fait main**, pas de librairie de carto ni d'iframe — poids nul,
  cohérent avec le vocabulaire d'arches, aucune donnée géographique inventée (juste une
  boucle stylisée + un point).
- **Sections basses en `React.lazy`** (Scene, Saisons, Pratique, Pasteur, Contact) : ce sont
  elles qui sont hors-écran au premier chargement. Voûtes/Feuillage/Ardoise/Comptoir restent
  statiques (plus proches du pli, et Voûtes a besoin de ScrollTrigger dès l'arrivée).
- **Pas de dynamic import pour GSAP lui-même** : Hero (au-dessus de la ligne de flottaison)
  et le scroll fluide site-entier (`useLenis`, actif dès `Home`) en dépendent tous les deux —
  le rendre paresseux aurait cassé l'un des deux. GSAP + ScrollTrigger font donc partie du
  bundle initial ; c'est un choix d'architecture assumé, pas un oubli, et le budget (180 Ko)
  est respecté avec marge malgré ça (130 Ko).

## Bugs réels trouvés et corrigés par QA visuelle

1. **Nav desktop cassée entre 768 et 1023px** : à ces largeurs, logo + 4 liens + bouton
   téléphone ne tenaient pas sur une ligne — retour à la ligne et bouton téléphone tronqué
   hors du cadre. Repéré en testant systématiquement 768/820/1024px (pas seulement 390 et
   1440). Corrigé en portant le seuil mobile/desktop partagé (`MOBILE_QUERY`, utilisé par le
   CSS *et* par la logique JS de pin GSAP) de 767px à 1199px, et en resserrant l'espacement de
   la nav. Revérifié à 768/1024/1199/1200/1440px : plus aucun retour à la ligne.
2. **Cibles tactiles < 44px sur mobile** : logo du header, liens du Footer (réseaux, légal,
   adresse) mesuraient 15 à 25px de haut sur mobile — sous le seuil fixé par le brief. Corrigé
   en donnant `min-height: var(--tap-target-min)` à chacun. Un seul cas laissé tel quel : le
   numéro de téléphone inline dans la phrase du Footer (« appelez-nous au 03 81 50 99 59 ») —
   un lien à l'intérieur d'une phrase est explicitement exempté de la taille minimale par
   WCAG 2.5.8, l'agrandir casserait la lecture de la phrase.
3. **Deux `<h2>` manquants** (Saisons, Contact), cassant la hiérarchie de titres. Corrigé :
   `<h2>` visuellement masqué pour Saisons, et la citation de chute de Contact promue en
   `<h2>` (elle en jouait déjà le rôle visuel).

## Ce qui marche

`tsc -b`, `npm run build` et `npm run lint` passent sans erreur. QA visuelle complète (Edge
headless piloté par Playwright) sur toutes les sections, desktop (1440, 1200, 1199, 1024, 768)
et mobile (390), plus un audit automatisé : un seul `<h1>`, hiérarchie de titres continue,
aucun `id` dupliqué, aucun SVG décoratif non masqué, aucune image sans nom accessible, aucune
erreur console, aucun débordement horizontal à aucune largeur testée.

**Bundle final** (`npm run build`) : JS initial **130,15 Ko gzip** (budget 180 Ko), CSS
initial 4,90 Ko gzip, polices 71,5 Ko (deux fichiers woff2, non bloquants). Cinq chunks
additionnels (sections basses) de 0,65 à 1,43 Ko gzip chacun, chargés séparément.

## Ce qui ne fonctionne pas encore / limites connues

- Toujours des `<PlaceholderImage>` partout (aucune vraie photo) — attendu, voir
  `IMAGES.md`.
- Le mécanisme d'inversion de contraste du Header (`data-header-contrast="light"`) est câblé
  mais inerte : aucune section du site n'est actuellement assez claire pour le déclencher. Prêt
  si une future section (ex. un Saisons repensé en clair) en a besoin.
- Détail cosmétique mineur déjà signalé en Phase 3 : le fond translucide du header compact
  laisse deviner un filet de la section précédente pendant le scroll (effet de verre dépoli
  volontaire, pas un bug).

## `[[À COMPLÉTER]]` / `[[À VÉRIFIER]]` restants

Inchangé depuis la Phase 1 : horaires, carte détaillée, vins/bières nommés, e-mail, raison
sociale, SIRET, RCS, n° TVA, capital social, directeur de publication, hébergeur, licence de
débit de boissons, confirmation du numéro de téléphone, lien éventuel avec « The Green Mama ».
Toutes ces obligations légales/factuelles sont documentées dans le README et visibles comme
telles sur `/mentions-legales`.

## Besoins pour la mise en ligne réelle

1. Les données ci-dessus, obtenues directement auprès de l'établissement (la page Facebook et
   thegreenman.fr n'ont pas pu être collectés automatiquement — voir `docs/SOURCES.md`).
2. Les photos listées dans `public/images/IMAGES.md`.
3. Un choix d'hébergeur (Netlify ou Vercel, tous deux prêts — voir README) et un nom de
   domaine ; `SITE_URL` dans `src/data/seo.ts` est à mettre à jour en conséquence.

Le projet est fonctionnellement complet pour les quatre phases prévues : `npm install && npm
run dev` (et `npm run build`) fonctionnent sans erreur, le site est digne avec ses données
manquantes plutôt que d'en camoufler l'absence.
