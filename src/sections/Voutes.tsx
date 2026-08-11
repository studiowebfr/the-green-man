import { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arch } from '../components/Arch';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { Reveal } from '../components/Reveal';
import { useGsapContext } from '../hooks/useGsapContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMediaQuery, MOBILE_QUERY } from '../hooks/useMediaQuery';
import { elementsBatiment, type ElementBatiment } from '../data/etablissement';
import './Voutes.css';

const IMAGES: Record<ElementBatiment['id'], { src: string; alt: string; width: number; height: number }> = {
  plafond: {
    src: '/images/voutes/plafond-contre-plongee.jpg',
    alt: 'Le plafond à la française classé, vu en contre-plongée',
    width: 1400,
    height: 1750,
  },
  voutes: {
    src: '/images/voutes/enfilade-voutes.jpg',
    alt: 'Enfilade de voûtes en pierre',
    width: 1200,
    height: 1600,
  },
  pierre: {
    src: '/images/voutes/pierre-lumiere-rasante.jpg',
    alt: 'Mur en pierre du Green Man, lumière rasante',
    width: 1200,
    height: 1200,
  },
};

const STOP_COUNT = elementsBatiment.length;
const BAND = 0.08;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);

interface StageState {
  archProgress: number[];
  opacity: number[];
  captionOpacity: number[];
  translateY: number[];
  scale: number[];
}

function computeStage(overall: number): StageState {
  const archProgress: number[] = [];
  const opacity: number[] = [];
  const translateY: number[] = [];
  const scale: number[] = [];

  for (let i = 0; i < STOP_COUNT; i += 1) {
    const windowStart = i / STOP_COUNT;
    const local = clamp01((overall - windowStart) / (1 / STOP_COUNT));
    archProgress.push(local);
    scale.push(1 + local * 0.06);

    if (i === 0) {
      opacity.push(1);
      translateY.push(0);
    } else {
      const o = clamp01((overall - (windowStart - BAND)) / (2 * BAND));
      opacity.push(o);
      translateY.push(lerp(40, 0, o));
    }
  }

  // La légende a besoin d'une fenêtre plus étroite que l'image : l'image
  // reste en place une fois révélée (elle est simplement recouverte par la
  // suivante), mais deux légendes texte superposées au même endroit
  // deviennent illisibles pendant le fondu — celle qui sort doit disparaître
  // au même rythme que la suivante apparaît, pas rester à l'opacité pleine.
  const captionOpacity = opacity.map((o, i) => {
    const next = i + 1 < STOP_COUNT ? opacity[i + 1] : 0;
    return o * (1 - next);
  });

  return { archProgress, opacity, captionOpacity, translateY, scale };
}

/**
 * Le bâtiment comme produit principal : trois arches s'ouvrent l'une après
 * l'autre pendant une séquence pinnée, la caméra avançant sous la voûte.
 * Sur mobile / prefers-reduced-motion : pas de pin, trois blocs verticaux
 * avec reveal simple, l'arche restant comme cadre statique.
 */
export function Voutes() {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const prefersReducedMotion = useReducedMotion();
  const usePinned = !isMobile && !prefersReducedMotion;

  const [stage, setStage] = useState<StageState>(() => computeStage(0));

  const scope = useGsapContext<HTMLElement>(
    (_ctx, node) => {
      if (!usePinned) return;
      const pinTarget = node.querySelector<HTMLElement>('.voutes__pin-wrap');
      if (!pinTarget) return;

      ScrollTrigger.create({
        trigger: pinTarget,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => setStage(computeStage(self.progress)),
      });
    },
    [usePinned],
  );

  return (
    <section id="voutes" ref={scope} className="voutes">
      <div className="container voutes__intro">
        <p className="eyebrow">Le lieu</p>
        <h2 className="font-display">Le bâtiment</h2>
      </div>

      {usePinned ? (
        <div className="voutes__pin-wrap">
          <div className="voutes__stage">
            {elementsBatiment.map((stop, i) => {
              const image = IMAGES[stop.id];
              return (
                <div
                  key={stop.id}
                  className="voutes__panel"
                  style={{
                    zIndex: i,
                    transform: `translateY(${stage.translateY[i]}px)`,
                  }}
                >
                  <div className="voutes__panel-visual" style={{ opacity: stage.opacity[i] }}>
                    <div className="voutes__media" style={{ transform: `scale(${stage.scale[i]})` }}>
                      <PlaceholderImage {...image} sizes="100vw" cover />
                    </div>
                    <div className="voutes__scrim" aria-hidden="true" />
                    <div className="voutes__arch-frame">
                      <Arch progress={stage.archProgress[i]} />
                    </div>
                  </div>
                  <div className="container voutes__caption" style={{ opacity: stage.captionOpacity[i] }}>
                    <h3 className="font-display">{stop.titre}</h3>
                    <p>{stop.texte}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container voutes__mobile-list">
          {elementsBatiment.map((stop) => {
            const image = IMAGES[stop.id];
            return (
              <Reveal key={stop.id}>
                <div className="voutes__mobile-stop">
                  <div className="voutes__arch-frame voutes__arch-frame--static">
                    <Arch variant="ouverte" />
                  </div>
                  <PlaceholderImage {...image} sizes="90vw" />
                  <h3 className="font-display">{stop.titre}</h3>
                  <p>{stop.texte}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
}
