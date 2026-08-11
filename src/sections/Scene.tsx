import { Reveal } from '../components/Reveal';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { Button } from '../components/Button';
import { evenements } from '../data/evenements';
import { etablissement } from '../data/etablissement';
import './Scene.css';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' });

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/**
 * Les concerts. La petite taille de la salle est l'argument, pas une
 * limite. Alimentée par evenements.ts ; renvoi Facebook tant qu'il est vide
 * — aucune date ni nom d'artiste inventé.
 */
export function Scene() {
  const hasEvents = evenements.length > 0;

  return (
    <section id="scene" className="scene">
      <div className="scene__media">
        <PlaceholderImage
          src="/images/scene/concert-tres-pres.jpg"
          alt="Concert vu de très près, à quelques mètres du musicien"
          width={1200}
          height={1500}
          sizes="100vw"
          cover
        />
        <div className="scene__scrim" aria-hidden="true" />
      </div>

      <div className="container scene__content">
        <Reveal>
          <p className="eyebrow">Les concerts</p>
          <h2 className="font-display">La scène</h2>
          <p className="scene__text">{etablissement.vieDuLieu.soiree}</p>
          <p className="scene__claim">À trois mètres du musicien, il n'y a pas de mauvaise place.</p>

          {hasEvents ? (
            <ul className="scene__events">
              {evenements.map((ev) => (
                <li key={ev.id} className="scene__event">
                  <span className="scene__event-date">{formatDate(ev.date)}</span>
                  <span className="scene__event-titre">{ev.titre}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="scene__renvoi">
              <p>La programmation est annoncée sur notre page Facebook.</p>
              <Button
                as="a"
                variant="outline"
                href={etablissement.reseaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir la programmation
              </Button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
