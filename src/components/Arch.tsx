import { LeafMark } from './LeafMark';
import './Arch.css';

export type ArchVariant = 'fermee' | 'entrouverte' | 'ouverte';

export interface ArchProps {
  /** Contrôlé : 0 (linteau plat) → 1 (arche complète). Prioritaire sur `variant`. */
  progress?: number;
  /** Non contrôlé, pour un usage statique simple. */
  variant?: ArchVariant;
  className?: string;
  /** true pour laisser l'arche s'étirer non uniformément (ex. arche aplatie du Footer). */
  stretch?: boolean;
}

const VARIANT_PROGRESS: Record<ArchVariant, number> = {
  fermee: 0,
  entrouverte: 0.5,
  ouverte: 1,
};

// viewBox 0 0 200 240 — ligne de naissance à 58% de la hauteur, arc en plein cintre.
const SPRING_Y = 139.2;
const ARC_D = `M 6 ${SPRING_Y} A 94 94 0 0 1 194 ${SPRING_Y}`;

/**
 * Élément signature du site : une seule implémentation, réutilisée comme cadre,
 * séparateur ou masque de révélation. Toujours décorative (aria-hidden) — voir
 * docs/DESIGN.md §3 pour la construction géométrique complète.
 */
export function Arch({ progress, variant = 'ouverte', className, stretch = false }: ArchProps) {
  const p = Math.max(0, Math.min(1, progress ?? VARIANT_PROGRESS[variant]));
  const dashOffset = 100 - p * 100;
  const lintelOpacity = 1 - p;
  const leafOpacity = Math.max(0, Math.min(1, (p - 0.6) / 0.4));

  return (
    <svg
      className={`arch${className ? ` ${className}` : ''}`}
      viewBox="0 0 200 240"
      preserveAspectRatio={stretch ? 'none' : 'xMidYMid meet'}
      aria-hidden="true"
      focusable="false"
    >
      <path className="arch__pier" d={`M 6 ${SPRING_Y} V 236`} />
      <path className="arch__pier" d={`M 194 ${SPRING_Y} V 236`} />
      <line
        className="arch__lintel"
        x1="6"
        y1={SPRING_Y}
        x2="194"
        y2={SPRING_Y}
        style={{ opacity: lintelOpacity }}
      />
      <path
        className="arch__arc"
        d={ARC_D}
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: dashOffset }}
      />
      <g className="arch__leaf" style={{ opacity: leafOpacity }} transform={`translate(100 ${SPRING_Y - 94})`}>
        <LeafMark />
      </g>
    </svg>
  );
}
