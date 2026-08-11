import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Reveal.css';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Délai en secondes, pour échelonner plusieurs Reveal (ex. séquence du Hero). */
  delay?: number;
}

/**
 * Révélation simple au scroll (opacité + léger déplacement), pour les blocs
 * de contenu qui n'ont pas besoin d'un gsap.context() dédié. Sous
 * prefers-reduced-motion, le contenu est visible immédiatement.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' reveal--visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: visible && delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}
