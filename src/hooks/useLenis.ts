import { useEffect, useRef, type RefObject } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery, MOBILE_QUERY } from './useMediaQuery';

// Enregistré au chargement du module, pas dans un effet : les sections qui
// utilisent ScrollTrigger (Voûtes…) ne doivent pas dépendre de l'ordre de
// montage par rapport à ce hook pour que le plugin soit déjà disponible.
gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll fluide (Lenis) synchronisé avec GSAP ScrollTrigger — desktop uniquement.
 * Sur mobile et sous prefers-reduced-motion, le scroll natif est conservé et ce
 * hook ne fait rien : c'est la dégradation attendue (voir docs/DESIGN.md,
 * section Mouvement). Appelé une seule fois, au niveau de la page (Home).
 */
export function useLenis(): RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion, isMobile]);

  return lenisRef;
}
