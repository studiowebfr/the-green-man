import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { Arch } from '../components/Arch';
import { etablissement } from '../data/etablissement';
import './Footer.css';

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${etablissement.adresse.formatCourt}`,
)}`;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__arch" aria-hidden="true">
        <Arch variant="ouverte" stretch />
      </div>

      <div className="container site-footer__grid">
        <div className="site-footer__block">
          <p className="font-display site-footer__name">{etablissement.nom}</p>
          <a className="site-footer__address" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={16} aria-hidden="true" />
            {etablissement.adresse.formatCourt}
          </a>
          <a className="site-footer__tel" href={etablissement.telephone.lienTel}>
            <Phone size={16} aria-hidden="true" />
            {etablissement.telephone.affichage}
          </a>
        </div>

        <div className="site-footer__block">
          <p className="eyebrow">Horaires</p>
          {etablissement.horaires ? (
            <ul className="site-footer__horaires">
              {etablissement.horaires.map((jour) => (
                <li key={jour.jour}>
                  <span>{jour.jour}</span>
                  <span>{jour.service ?? jour.bar ?? 'Fermé'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="site-footer__muted">
              Horaires en cours de confirmation — appelez-nous au{' '}
              <a href={etablissement.telephone.lienTel}>{etablissement.telephone.affichage}</a>.
            </p>
          )}
        </div>

        <div className="site-footer__block">
          <p className="eyebrow">Réseaux</p>
          <ul className="site-footer__links">
            <li>
              <a href={etablissement.reseaux.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href={etablissement.reseaux.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer__block">
          <p className="eyebrow">Accessibilité &amp; paiement</p>
          <p className="site-footer__muted">{etablissement.services.map((s) => s.label).join(' · ')}</p>
          <p className="site-footer__muted">{etablissement.paiements.join(' · ')}</p>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <nav className="site-footer__legal" aria-label="Informations légales">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
        </nav>
        <p className="site-footer__credits">
          Projet de démonstration non commandité par The Green Man. Marque et contenus factuels
          appartenant à leurs propriétaires respectifs.
        </p>
      </div>
    </footer>
  );
}
