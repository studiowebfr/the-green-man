import { useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';

/**
 * Encapsule gsap.context() sur un scope de ref : toutes les animations et
 * ScrollTrigger créés dans `setup` sont automatiquement nettoyés (ctx.revert())
 * au démontage ou au changement de dépendances. Aucune section ne doit créer
 * de gsap.context() en dehors de ce hook.
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (context: gsap.Context, scope: T) => void,
  deps: DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useLayoutEffect(() => {
    const node = scope.current;
    if (!node) return;

    // gsap.context() exécute son callback de façon synchrone, avant que
    // `const ctx = …` ne soit assigné : on récupère le contexte via l'argument
    // que GSAP passe lui-même au callback, pas via la variable externe.
    const ctx = gsap.context((self) => setup(self, node), node);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
