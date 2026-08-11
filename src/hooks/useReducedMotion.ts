import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * true si l'utilisateur a demandé moins d'animation au niveau système.
 * Toute la mise en scène (Lenis, ScrollTrigger, parallax, pin) doit se
 * désactiver quand ce hook renvoie true — voir docs/DESIGN.md.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  return reduced;
}
