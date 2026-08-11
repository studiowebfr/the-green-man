import { useEffect, useState } from 'react';

/** Abonnement réactif à une media query CSS (ex. '(max-width: 1199px)'). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/**
 * Seuil mobile/tablette partagé par tout le site (Lenis, pin GSAP, parallax,
 * menu plein écran…). Volontairement large (< 1200px) : la nav desktop
 * (logo + 4 liens + bouton téléphone) ne tient pas proprement sur une seule
 * ligne en dessous — testé visuellement à 768/1024/1199/1200px, voir
 * docs/RAPPORT-PHASE-4.md.
 */
export const MOBILE_QUERY = '(max-width: 1199px)';
