/**
 * Grain minéral discret sur toute la page — texture, pas décor figuratif.
 * Opacité déjà réduite sous prefers-reduced-motion via .grain (global.css).
 */
export function Grain() {
  return (
    <>
      <svg className="visually-hidden" aria-hidden="true" focusable="false">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="grain" style={{ filter: 'url(#grain-filter)' }} aria-hidden="true" />
    </>
  );
}
