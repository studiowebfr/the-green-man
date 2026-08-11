# Images attendues — The Green Man

Aucune image de ce projet ne provient de la page Facebook ou du site existant de
l'établissement (interdit par le brief). Toutes les images listées ici sont donc à
**produire ou commander** (photographe, ou banque de médias avec droits vérifiés) puis
déposées aux chemins indiqués. Tant qu'un fichier est absent, `<PlaceholderImage>`
l'affiche avec ses dimensions et son nom de fichier attendus — rien n'est jamais cassé
ni vide.

**Procédure de remplacement** : déposer le fichier au chemin `src` indiqué (en 3 formats,
voir plus bas), puis dans le composant concerné remplacer `<PlaceholderImage {...props} />`
par `<Image {...props} />` — les props sont strictement identiques.

**Formats** : chaque image doit exister en AVIF → WebP → JPEG (fallback), servie via
`<picture>` avec `width`/`height` toujours renseignés, `decoding="async"`, et
`loading="lazy"` sauf pour l'image `priority` (le Hero). `alt` doit être une description
réelle de la photo (jamais le nom de fichier, jamais vide sauf usage décoratif prouvé).

Le jeu de vues ci-dessous porte spécifiquement le concept « pierre et feuilles » — aucune
image générique de bar ne doit le remplacer.

| Chemin | Sujet | Ratio | Dimensions de base | Poids max | Priorité |
|---|---|---|---|---|---|
| `/images/hero/hero-salle.jpg` | Vue large de la salle : pierre, voûte et cheminée en ambiance — image de fond du Hero (LCP) | 4:5 | 1600×2000 | 220 Ko | **priority — pas de lazy-loading** |
| `/images/voutes/plafond-contre-plongee.jpg` | Le plafond à la française classé, vu en contre-plongée | 4:5 | 1400×1750 | 180 Ko | lazy |
| `/images/voutes/enfilade-voutes.jpg` | Enfilade de voûtes en pierre, profondeur de couloir | 3:4 | 1200×1600 | 160 Ko | lazy |
| `/images/voutes/pierre-lumiere-rasante.jpg` | Texture des murs en pierre, lumière rasante | 1:1 | 1200×1200 | 150 Ko | lazy |
| `/images/feuillage/pierre-sculptee.jpg` | Détail de pierre taillée / clé de voûte — support visuel de la section Feuillage, sans affirmation historique sur une sculpture précise | 1:1 | 1000×1000 | 130 Ko | lazy |
| `/images/comptoir/cheminee-allumee.jpg` | La cheminée allumée, ambiance du soir | 4:5 | 1200×1500 | 170 Ko | lazy |
| `/images/scene/concert-tres-pres.jpg` | Concert vu de très près — la proximité comme argument, pas comme limite | 4:5 | 1200×1500 | 170 Ko | lazy |
| `/images/saisons/hiver-cheminee.jpg` | Ambiance hiver au coin du feu | 3:2 | 1600×1067 | 180 Ko | lazy |
| `/images/saisons/ete-terrasse.jpg` | La terrasse en été | 3:2 | 1600×1067 | 180 Ko | lazy |
| `/images/og/og-image.jpg` | Image de partage Open Graph / Twitter Card | 1200×630 fixe | 1200×630 | 200 Ko | n/a (non affichée sur la page) |

## Notes

- Prévoir chaque photo en au moins deux largeurs supplémentaires (`-800w`, `-1200w`) pour
  le `srcset` responsive une fois la vraie image disponible ; `sizes` est déjà documenté
  au niveau de chaque usage de `<PlaceholderImage>` dans les sections (prop `sizes`).
- Aucune photo de personne reconnaissable sans autorisation (droit à l'image), en
  particulier pour `scene/concert-tres-pres.jpg`.
- Le favicon (`/favicon.svg`) est une marque abstraite originale (arche + feuille stylisée
  aux couleurs des tokens), pas un logo de l'établissement — aucun logo réel n'a été
  récupéré ni reproduit.
