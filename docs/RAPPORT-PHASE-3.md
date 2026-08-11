# Rapport — Phase 3 (Voûtes, Feuillage, Ardoise, Comptoir)

## Fichiers créés

- `sections/Voutes` (+ `.css`) — séquence pinnée de trois arches sur desktop, repli en trois blocs
  verticaux avec `Reveal` sur mobile/`prefers-reduced-motion`.
- `sections/Feuillage` (+ `.css`) — la figure du Green Man, texte général sourcé.
- `sections/Ardoise` (+ `.css`) et `components/SlateBoard` (+ `.css`) — l'ardoise réelle, alimentée
  par `carte.faitsEtablis` tant que `carte.plats` est vide.
- `sections/Comptoir` (+ `.css`) — ambiance du soir, alimentée par la description déjà sourcée tant
  que `carte.boissons` est vide.
- Ajouts dans `data/etablissement.ts` : `elementsBatiment` (3 faits établis sur le bâtiment, un par
  arche) et `figureDuGreenMan` (texte général sur le motif, sans affirmation sur ce bâtiment précis).
- `Home.tsx` : les quatre sections branchées ; `useLenis()` enfin appelé (voir bug ci-dessous).

## Décisions et pourquoi

- **Trois faits, trois arches, un mapping strict.** `elementsBatiment` ne contient que ce que la
  source dit explicitement (plafond à la française classé, voûtes, murs en pierre) — pas de date,
  pas d'architecte. Le texte de chaque arche reste descriptif, jamais historique.
- **Feuillage reste général.** `figureDuGreenMan` décrit le motif architectural documenté (visage
  feuillu gravé dans les clés de voûte médiévales) sans jamais affirmer qu'une sculpture de ce type
  existe dans ce bâtiment précis — conforme à la consigne du brief.
- **Séquence Voûtes : opacité de légende séparée de l'opacité du panneau.** Voir bug ci-dessous —
  décision prise pendant la QA visuelle, pas anticipée dans le plan initial.
- **Ardoise/Comptoir : même patron de dégradation.** Tant que `carte.ts` est vide, on affiche les
  faits établis + un renvoi téléphone/Facebook ; le jour où `carte.plats`/`carte.boissons` sont
  remplis, le renvoi disparaît et la vraie carte s'affiche — un seul point de bascule (`hasCarte`/
  `hasBoissons`), pas deux implémentations à maintenir.

## Bug réel trouvé et corrigé par QA visuelle

**Oubli fonctionnel : `useLenis()` n'était jamais appelé.** Construit en Phase 1, jamais branché —
le scroll fluide n'a jamais été actif jusqu'à cette phase. Corrigé (`Home.tsx`), et l'enregistrement
du plugin `ScrollTrigger` déplacé du corps de l'effet vers le chargement du module pour ne plus
dépendre de l'ordre de montage (Voûtes en a besoin dès son premier rendu).

**Légendes qui se chevauchent pendant le fondu de la séquence pinnée.** Repéré en capturant
plusieurs points de scroll dans la séquence Voûtes : le texte de l'arche sortante restait à pleine
opacité pendant que le texte entrant montait en opacité par-dessus, illisible au pic du fondu.
Corrigé en donnant à la légende sa propre fenêtre d'opacité (`captionOpacity`), plus étroite que
celle du panneau/image : `captionOpacity[i] = opacity[i] × (1 − opacity[i+1])`. L'image, elle, reste
à opacité pleine une fois révélée — elle est simplement recouverte par la suivante, ce qui est
souhaité (aucun flash de fond entre deux photos). Vérifié à sept points de la séquence (0 %, 15 %,
35 %, 50 %, 65 %, 85 %, 100 %) avant/après.

## Ce qui marche

`tsc -b`, `npm run build` et `npm run lint` passent sans erreur. QA visuelle complète (Edge headless
piloté par Playwright) : séquence pinnée desktop du début à la fin, repli mobile en trois blocs,
`prefers-reduced-motion` (aucun pin, contenu visible immédiatement), Ardoise et Comptoir dans leur
état actuel (carte vide), aucune erreur console à aucune étape, aucun débordement horizontal
(vérifié à 1440px et 390px). Bundle JS gzippé : 134,5 Ko (budget 180 Ko pour tout le site).

## Ce qui ne marche pas / n'existe pas encore

Scène, Saisons, Pratique, Pasteur, Contact (Phase 4). Le Footer suit directement Comptoir pour
l'instant. Détail cosmétique mineur observé en QA, sans gravité : pendant le scroll, le fond
translucide du header compact (`rgb(33 28 24 / 0.85)` + flou) laisse deviner en transparence un
filet de la section qui vient de défiler dessous — effet de verre dépoli attendu, pas un bug, mais
à garder à l'œil une fois les vraies photos en place (le flou sera plus efficace sur une image que
sur un dégradé plat).

## `[[À COMPLÉTER]]` / `[[À VÉRIFIER]]` restants

Inchangé depuis la Phase 1.

## Besoins pour avancer

Aucun blocage. Je poursuis en Phase 4 (Scène, Saisons, Pratique, Pasteur, Contact), puis performance,
accessibilité, responsive, `npm run build` final et rapport de clôture.
