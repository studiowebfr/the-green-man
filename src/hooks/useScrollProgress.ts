import { useEffect, useRef, useState, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ScrollProgress<T> {
  ref: RefObject<T | null>;
  /** 0 = l'élément entre en bas de viewport, 1 = il en sort en haut. */
  progress: number;
}

/**
 * Progression de scroll légère (0–1) pour un élément, basée sur
 * IntersectionObserver + requestAnimationFrame — pour les bascules simples
 * (ex. Saisons) qui n'ont pas besoin d'un gsap.context() complet.
 * Les séquences pinnées (Voûtes) utilisent ScrollTrigger directement via
 * useGsapContext, pas ce hook.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(): ScrollProgress<T> {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const raw = (viewportH - rect.top) / (viewportH + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame);
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(update);
        }
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return { ref, progress };
}
