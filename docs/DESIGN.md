# DESIGN.md — The Green Man

Direction artistique : « la pierre et les feuilles ». Le nom de l'établissement est une figure
sculptée dans la pierre des bâtiments voûtés médiévaux — un visage d'où poussent des feuilles,
gravé dans les clés de voûte. Le bâtiment (murs en pierre, voûtes, plafond à la française classé)
raconte exactement la même chose. Tout le système visuel découle de cette coïncidence : rien
d'irlandais de carte postale, rien d'illustratif — de la pierre, de la profondeur, une seule
figure gravée qui revient toujours au même endroit : la clé de voûte.

---

## 1. Palette — cinq teintes nommées

| Nom | Hex | Rôle |
|---|---|---|
| **Pierre** | `#4A4139` | Gris de pierre chaude, dominante neutre. Base de toutes les surfaces mid-tone ; sa nuance la plus sombre (`#211C18`, dérivée) sert de fond dominant au site — la « profondeur d'une voûte mal éclairée ». |
| **Ambre** | `#C98A3F` | Feu de cheminée. Seul accent chaud du système : CTA, liens, survols, trait de soulignement, glow discret. Source de lumière du lieu en hiver — justifie tout l'or de la référence. |
| **Mousse** | `#5B6350` | Feuillage du Green Man. Vert mineral, décoratif uniquement (jamais de texte) — voir justification ci-dessous. |
| **Chêne** | `#2C211A` | Brun-noir chaud pour les surfaces les plus sombres : cartes, pied de page, fond du Comptoir. |
| **Parchemin** | `#EDE4D3` | Crème claire pour les respirations, l'Ardoise, le texte sur fond sombre. |

### Pourquoi la mousse et pas un vert sapin ou bouteille

`#5B6350` a une saturation basse (~15 %) et une teinte proche de l'olive (~95° sur le cercle
chromatique), avec une luminosité volontairement proche de celle de la famille Pierre qui
l'entoure. Un vert sapin (haute saturation, teinte ~150°) ou un vert bouteille (très sombre,
saturé, teinte proche du sarcelle) se comporteraient comme une couleur de marque, un aplat qui
« saute » — l'effet forêt / brasserie irlandaise à éviter explicitement. La mousse doit avoir l'air
de pousser SUR la pierre, pas d'être peinte à côté : sa proximité de valeur et de désaturation
avec `Pierre` et `Chêne` la fait presque disparaître en dehors du motif gravé, ce qui est
l'intention — un feuillage qui se lit seulement en s'approchant, jamais un logo vert.

### Contrôle de contraste (le point de rupture identifié dans le brief)

- **Ambre `#C98A3F` sur Pierre sombre `#211C18`** → ratio ≈ **5,8:1**. Passe AA texte normal et AAA
  grand texte. C'est la combinaison utilisée pour le texte ambre (liens, labels d'accent) — toujours
  sur fond sombre.
- **Ambre `#C98A3F` sur Parchemin `#EDE4D3`** → ratio ≈ **2,3:1**. Échoue AA, y compris en grand
  texte. **Règle stricte : l'ambre n'est jamais utilisé comme couleur de texte sur fond clair.**
  Sur Parchemin, l'ambre reste réservé aux éléments non textuels (bordures, remplissages d'icônes,
  soulignements ≥ 3 px). Le texte d'accent sur fond clair utilise Chêne ou Pierre sombre.
- **Mousse `#5B6350` sur Pierre sombre** → ratio ≈ **2,7:1**. Insuffisant pour du texte à toute
  taille. Confirme que la mousse reste un usage strictement décoratif (motif gravé, icônes,
  traits), jamais du texte ni un fond de zone interactive.
- **Parchemin `#EDE4D3` sur Pierre sombre `#211C18`** → ratio ≈ **13,6:1**. Combinaison de texte
  courant du site (corps de texte sur fond sombre).

---

## 2. Typographie — deux familles, rôles distincts

### Display — Fraunces (variable, auto-hébergée `fraunces-variable.woff2`)

Serif à empattements marqués, à la coupe nette plutôt que calligraphique — c'est ce qui la
rapproche d'une gravure plutôt que d'une plaque de brasserie. Axe `wght` exploité de 400 à 700 ;
l'axe `opsz` (optical size) est maintenu haut (`font-variation-settings: "opsz" 100` par défaut
sur toutes les instances display) car Fraunces n'est jamais utilisée en dessous de ~28px — à
haute taille optique ses empattements se marquent davantage, exactement l'effet « taillé dans la
pierre » recherché. Les axes non standards (SOFT, WONK) ne sont pas exposés dans le fichier servi :
la coupe reste toujours nette, jamais arrondie ni excentrique.

Rôles :
- H1 hero « THE GREEN MAN » — 700
- Titres de section (H2) — 600
- Sous-titres de section (H3) — 500
- Citation de chute « ON Y VIENT ET ON Y REVIENT » (section Contact) — 700, très grande taille
- Prix / intitulés sur l'Ardoise (`SlateBoard`), une fois la carte renseignée — 500

### Corps — Archivo (variable, auto-hébergée `archivo-variable.woff2`)

Grotesque très lisible, sobre, sans excentricité — sert de socle neutre qui ne concurrence jamais
Fraunces. Axe `wght` 400 à 700.

Rôles :
- Navigation, boutons, labels — 500
- Corps de texte, paragraphes, légendes — 400
- Emphase courte, chiffres pratiques (Pratique, Footer) — 600
- Rare emphase forte (jamais en gros bloc) — 700

Chargement : `woff2` uniquement, `font-display: swap`, `<link rel="preload">` sur Fraunces
variable (police du LCP, utilisée dans le H1 du Hero). Archivo est chargée en parallèle sans
preload — elle n'est pas sur le chemin critique du LCP texte (le LCP réel du site est l'image de
fond du Hero, cf. brief Performance).

---

## 3. Construction de l'arche — élément signature

Un seul composant, `Arch`, réutilisé partout ; jamais d'arche dessinée à la main hors de ce
composant.

**Géométrie.** `viewBox="0 0 200 240"`. Arche en plein cintre (romane, pas gothique — cohérente
avec des voûtes de cave/rez-de-chaussée en pierre plutôt qu'une élévation gothique élancée, et
plus « chaude, habitée » qu'un arc brisé). Deux piédroits verticaux montent jusqu'à la ligne de
naissance (`springLine`, à 58 % de la hauteur totale) puis se rejoignent en demi-cercle dont le
rayon égale la demi-largeur de l'ouverture. Épaisseur de trait constante (`stroke-width` en
`em`, jamais en `px` figé) pour évoquer un piétement de pierre taillée plutôt qu'un filet
graphique.

**Clé de voûte.** Au sommet du demi-cercle, un `LeafMark` : une forme géométrique réduite à une
nervure centrale qui se scinde en deux lobes symétriques (jamais une feuille illustrée en détail,
juste son schéma le plus économe). Rendu en `Mousse`, à faible opacité (~35–45 %) sauf au survol /
en focus des éléments interactifs qu'elle marque, où l'opacité monte et une légère lueur `Ambre`
apparaît en accompagnement (référence discrète au feu qui éclaire la pierre).

**Variantes d'ouverture** (une seule géométrie, trois états pilotés par un prop `progress: 0–1`) :
- `fermee` (`progress = 0`) — l'arc n'est qu'un linteau plat, aucune ouverture : état de repos
  avant déclenchement du scroll.
- `entrouverte` (`0 < progress < 1`) — le tracé de l'arc se déploie progressivement (longueur de
  trait interpolée), la clé de voûte apparaît en dernier. C'est l'état utilisé pendant les
  séquences pinnées de la section Voûtes.
- `ouverte` (`progress = 1`) — arche complète, utilisée comme cadre statique, séparateur de
  section, ou masque de révélation (`clipPath`) pour une image ou un bloc de contenu placé
  derrière elle.

Toujours `aria-hidden="true"` : l'arche est strictement décorative, jamais porteuse de contenu
qu'un lecteur d'écran devrait annoncer.

**Usages du même composant** : fermeture du Hero (bascule `fermee → entrouverte` en fin
d'apparition), triple révélation pinnée de Voûtes, cadre de chaque photo de Scene et Saisons,
séparateur entre Ardoise et Comptoir, cadre des groupes d'icônes de Pratique, ligne de pied de
page en Footer (arche aplatie, `progress = 1`, très large et basse). Aucun autre motif décoratif
n'est introduit dans le site : le `LeafMark` n'existe qu'au sommet d'une `Arch`, jamais en élément
autonome, pour qu'une seule chose reste en mémoire après la visite.

---

## 4. Ce que la DA exclut explicitement

Trèfles, harpes, lutins, drapeaux, faux bois vieilli, pancartes émaillées de brasseur, cartouches
ornementés, blasons, cadres de parchemin, lettrage celtique ou gothique. L'établissement se décrit
comme « de style irlandais », mais son véritable atout différenciant est un plafond à la française
classé dans un bâtiment en pierre bisontin — c'est ce bâtiment que le site montre, pas un folklore
importé.
