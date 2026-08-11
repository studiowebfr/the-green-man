import { MapPin, Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { etablissement } from '../data/etablissement';
import './Contact.css';

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  etablissement.adresse.formatCourt,
)}`;

/**
 * La chute du site. Pas de formulaire, pas de newsletter — juste le
 * téléphone, l'adresse, les réseaux, et les horaires dès qu'ils existent.
 */
export function Contact() {
  return (
    <section id="contact" className="contact section defer-paint">
      <div className="container">
        <Reveal>
          <h2 className="contact__formule font-display">« {etablissement.formule} »</h2>
        </Reveal>

        <Reveal className="contact__grid">
          <a className="contact__tel" href={etablissement.telephone.lienTel}>
            <Phone size={22} aria-hidden="true" />
            {etablissement.telephone.affichage}
          </a>

          <a className="contact__link" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={18} aria-hidden="true" />
            {etablissement.adresse.formatCourt}
          </a>

          <div className="contact__social">
            <a href={etablissement.reseaux.facebook} target="_blank" rel="noopener noreferrer" className="contact__link">
              Facebook
            </a>
            <a
              href={etablissement.reseaux.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
            >
              Instagram
            </a>
          </div>

          {etablissement.horaires ? (
            <ul className="contact__horaires">
              {etablissement.horaires.map((jour) => (
                <li key={jour.jour}>
                  <span>{jour.jour}</span>
                  <span>{jour.service ?? jour.bar ?? 'Fermé'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="contact__muted">Horaires en cours de confirmation — le plus sûr est d'appeler.</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
