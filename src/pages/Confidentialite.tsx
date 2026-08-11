import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../components/Seo';
import { etablissement } from '../data/etablissement';
import { pagesSeo } from '../data/seo';
import './LegalPage.css';

export function Confidentialite() {
  return (
    <main id="main-content" className="legal-page">
      <Seo page={pagesSeo.confidentialite} />
      <div className="container">
        <Link className="legal-page__back" to="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Retour au site
        </Link>

        <h1 className="legal-page__title font-display">Confidentialité</h1>
        <p className="legal-page__updated">Site vitrine The Green Man</p>

        <section className="legal-page__section">
          <h2>Aucun cookie, aucun traceur</h2>
          <p>
            Ce site n'utilise ni cookie, ni outil d'analytics, ni police distante, ni widget
            Facebook ou Instagram. Il n'y a donc pas de bandeau de consentement à afficher : rien
            n'est déposé sur votre appareil au chargement de la page.
          </p>
        </section>

        <section className="legal-page__section">
          <h2>Aucune donnée personnelle collectée</h2>
          <p>
            Le site ne comporte ni formulaire, ni newsletter, ni compte utilisateur. Aucune donnée
            personnelle n'est donc collectée ni stockée par ce site.
          </p>
        </section>

        <section className="legal-page__section">
          <h2>Liens externes</h2>
          <p>
            Le site renvoie vers la page Facebook ({etablissement.reseaux.facebook}) et le compte
            Instagram ({etablissement.reseaux.instagram}) de l'établissement, ainsi que vers Google
            Maps pour l'itinéraire. Ces services tiers appliquent leur propre politique de
            confidentialité une fois que vous les avez ouverts.
          </p>
        </section>

        <section className="legal-page__section">
          <h2>Hébergement</h2>
          <p>Voir les coordonnées de l'hébergeur dans les mentions légales.</p>
        </section>

        <p className="legal-page__notice">
          Si des outils de mesure d'audience ou un flux social embarqué sont ajoutés à ce site à
          l'avenir, cette politique devra être mise à jour et un bandeau de consentement RGPD
          devra être mis en place avant tout dépôt de cookie non essentiel — voir le README pour la
          marche à suivre.
        </p>
      </div>
    </main>
  );
}
