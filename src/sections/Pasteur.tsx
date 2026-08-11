import { MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { etablissement } from '../data/etablissement';
import './Pasteur.css';

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  etablissement.adresse.formatCourt,
)}`;

/**
 * Pas d'iframe Google Maps (poids, cookies, RGPD) : une carte SVG stylisée,
 * cohérente avec le vocabulaire d'arches — décorative, pas une cartographie
 * exacte. L'itinéraire réel se fait via le bouton, vers Google Maps.
 */
export function Pasteur() {
  return (
    <section id="pasteur" className="pasteur section defer-paint">
      <div className="container pasteur__grid">
        <Reveal>
          <p className="eyebrow">Où nous trouver</p>
          <h2 className="font-display pasteur__title">21 rue Pasteur</h2>
          <p className="pasteur__text">{etablissement.situation.description}</p>
          <Button as="a" variant="primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={16} aria-hidden="true" />
            Itinéraire
          </Button>
        </Reveal>

        <Reveal className="pasteur__map-wrap">
          <svg className="pasteur__map" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
            <path
              d="M200 40 C 320 40 360 140 360 200 C 360 300 280 360 200 360 C 100 360 40 300 40 220 C 40 130 100 40 200 40 Z"
              className="pasteur__loop"
            />
            <path d="M60 200 H 340" className="pasteur__street" />
            <path d="M200 60 V 340" className="pasteur__street" />
            <path d="M110 110 L 290 290" className="pasteur__street pasteur__street--faint" />
            <circle cx="200" cy="200" r="10" className="pasteur__marker" />
            <circle cx="200" cy="200" r="20" className="pasteur__marker-ring" />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
