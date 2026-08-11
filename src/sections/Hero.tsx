import { useState } from 'react';
import gsap from 'gsap';
import { ChevronDown, Phone } from 'lucide-react';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { Arch } from '../components/Arch';
import { Button } from '../components/Button';
import { useGsapContext } from '../hooks/useGsapContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { etablissement } from '../data/etablissement';
import './Hero.css';

/**
 * 100vh. La séquence d'apparition échelonne le texte puis ouvre la première
 * arche du site — elle enchaîne visuellement sur Voûtes (Phase 3).
 * L'image de fond est le LCP : <picture> à venir en Phase 4, dimensions
 * fixées dès maintenant via PlaceholderImage (mêmes props).
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [archProgress, setArchProgress] = useState(prefersReducedMotion ? 1 : 0);

  const scope = useGsapContext<HTMLElement>(
    (_ctx, node) => {
      if (prefersReducedMotion) {
        setArchProgress(1);
        return;
      }
      const targets = node.querySelectorAll('[data-hero-reveal]');
      const archProxy = { p: 0 };
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.set(targets, { opacity: 0, y: 28 });
      tl.to(targets, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 });
      tl.to(
        archProxy,
        {
          p: 1,
          duration: 1,
          onUpdate: () => setArchProgress(archProxy.p),
        },
        '-=0.35',
      );
    },
    [prefersReducedMotion],
  );

  return (
    <section id="hero" ref={scope} className="hero">
      <div className="hero__media">
        <PlaceholderImage
          src="/images/hero/hero-salle.jpg"
          alt="Salle du Green Man : murs en pierre, voûte et cheminée allumée"
          width={1600}
          height={2000}
          sizes="100vw"
          priority
          cover
        />
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="container hero__content">
        <p className="eyebrow" data-hero-reveal>
          Bar · Restaurant · Café
        </p>
        <h1 className="hero__title font-display" data-hero-reveal>
          {etablissement.nom}
        </h1>
        <p className="hero__accroche" data-hero-reveal>
          {etablissement.accroche}
        </p>
        <p className="hero__subline" data-hero-reveal>
          {etablissement.adresse.rue}, au cœur de {etablissement.adresse.ville}.
        </p>

        <div className="hero__ctas" data-hero-reveal>
          <Button as="a" href="#voutes" variant="primary">
            Le lieu
          </Button>
          <Button as="a" href={etablissement.telephone.lienTel} variant="outline">
            <Phone size={16} aria-hidden="true" />
            {etablissement.telephone.affichage}
          </Button>
        </div>
      </div>

      <div className="hero__arch">
        <Arch progress={archProgress} />
      </div>

      <a className="hero__scroll-cue" href="#voutes" data-hero-reveal aria-label="Découvrir le lieu">
        <ChevronDown size={22} aria-hidden="true" />
      </a>
    </section>
  );
}
