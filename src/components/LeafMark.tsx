/**
 * Le feuillage du Green Man réduit à son schéma le plus économe : une nervure
 * centrale qui se scinde en deux lobes symétriques. N'existe jamais seul,
 * uniquement à la clé d'une <Arch> — voir docs/DESIGN.md §3.
 */
export function LeafMark() {
  return (
    <g className="leaf-mark">
      <path className="leaf-mark__lobe" d="M0 -14 C6 -8 6 4 0 14 C-6 4 -6 -8 0 -14 Z" />
      <path className="leaf-mark__vein" d="M0 -14 L0 14" />
    </g>
  );
}
