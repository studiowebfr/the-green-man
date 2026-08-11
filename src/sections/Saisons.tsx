import { PlaceholderImage } from '../components/PlaceholderImage';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { etablissement } from '../data/etablissement';
import './Saisons.css';

/**
 * Deux ambiances qui se répondent — la cheminée l'hiver, la terrasse l'été —
 * avec une légère bascule au scroll (parallax inversé sur les deux photos).
 * Rien au-delà de ce que les sources disent : pas de calendrier, pas de
 * fréquence, pas de tarif.
 */
export function Saisons() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const prefersReducedMotion = useReducedMotion();
  const shift = prefersReducedMotion ? 0 : (progress - 0.5) * 40; // ±20px

  return (
    <section id="saisons" ref={ref} className="saisons" aria-labelledby="saisons-heading">
      <h2 id="saisons-heading" className="visually-hidden">
        Les saisons
      </h2>
      <div className="saisons__panel saisons__panel--hiver">
        <div className="saisons__media" style={{ transform: `translateY(${-shift}px)` }}>
          <PlaceholderImage
            src="/images/saisons/hiver-cheminee.jpg"
            alt="Ambiance hiver au coin du feu"
            width={1600}
            height={1067}
            sizes="(min-width: 900px) 50vw, 100vw"
            cover
          />
        </div>
        <div className="saisons__scrim" aria-hidden="true" />
        <div className="saisons__text">
          <p className="eyebrow">L'hiver</p>
          <h3 className="font-display">Au coin de la cheminée</h3>
          <p>On s'installe l'hiver au coin de la cheminée.</p>
        </div>
      </div>

      <div className="saisons__panel saisons__panel--ete">
        <div className="saisons__media" style={{ transform: `translateY(${shift}px)` }}>
          <PlaceholderImage
            src="/images/saisons/ete-terrasse.jpg"
            alt="La terrasse en été"
            width={1600}
            height={1067}
            sizes="(min-width: 900px) 50vw, 100vw"
            cover
          />
        </div>
        <div className="saisons__scrim" aria-hidden="true" />
        <div className="saisons__text">
          <p className="eyebrow">L'été</p>
          <h3 className="font-display">Sur la petite terrasse</h3>
          <p>L'été, on profite de la petite terrasse.</p>
        </div>
      </div>

      <div className="container saisons__footnote">
        <p>{etablissement.vieDuLieu.saisons}</p>
      </div>
    </section>
  );
}
