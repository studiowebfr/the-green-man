import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import './Cursor.css';

const COARSE_POINTER_QUERY = '(hover: none), (pointer: coarse)';

/**
 * Lueur discrète qui suit le pointeur — jamais un remplacement du curseur
 * système ni de l'indicateur de focus. Absente sur tactile, sous
 * prefers-reduced-motion, et masquée dès qu'une navigation clavier démarre.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery(COARSE_POINTER_QUERY);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const disabled = prefersReducedMotion || isCoarsePointer;

  useEffect(() => {
    if (disabled) return;
    const ring = ringRef.current;
    if (!ring) return;

    let frame = 0;
    let x = -100;
    let y = -100;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          frame = 0;
        });
      }
    };
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') setKeyboardNav(true);
    };
    const onMouseDown = () => setKeyboardNav(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('keydown', onKeydown);
    window.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', onKeydown);
      window.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(frame);
    };
  }, [disabled]);

  if (disabled) return null;

  return <div ref={ringRef} className={`cursor${keyboardNav ? ' cursor--hidden' : ''}`} aria-hidden="true" />;
}
