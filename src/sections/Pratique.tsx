import { Accessibility, Dog, Languages, MapPin, Sun, Ticket, Wifi } from 'lucide-react';
import type { ComponentType } from 'react';
import { Reveal } from '../components/Reveal';
import { Arch } from '../components/Arch';
import { etablissement } from '../data/etablissement';
import './Pratique.css';

const ICONS: Record<string, ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  pmr: Accessibility,
  animaux: Dog,
  wifi: Wifi,
  terrasse: Sun,
  anglais: Languages,
};

const PRATIQUE_IDS = ['pmr', 'animaux', 'wifi', 'terrasse', 'anglais'];

/**
 * Accessibilité, animaux, wifi, tickets restaurant, parking : ce qui
 * déclenche réellement une visite, et qu'aucun concurrent ne met en avant.
 */
export function Pratique() {
  const items = etablissement.services.filter((s) => PRATIQUE_IDS.includes(s.id));

  return (
    <section id="pratique" className="pratique section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Infos pratiques</p>
          <h2 className="font-display">Ce qui facilite la venue</h2>
        </Reveal>

        <div className="pratique__grid">
          {items.map((item) => {
            const Icon = ICONS[item.id];
            return (
              <Reveal key={item.id} className="pratique__card">
                <div className="pratique__icon-frame">
                  <Arch variant="ouverte" />
                  {Icon && <Icon size={22} aria-hidden={true} />}
                </div>
                <p>{item.label}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="pratique__extra">
          <div className="pratique__extra-item">
            <Ticket size={20} aria-hidden="true" />
            <p>Moyens de paiement acceptés : {etablissement.paiements.join(' · ')}.</p>
          </div>
          <div className="pratique__extra-item">
            <MapPin size={20} aria-hidden="true" />
            <p>{etablissement.situation.parking}.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
