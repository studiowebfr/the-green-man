import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../components/Seo';
import { etablissement } from '../data/etablissement';
import { pagesSeo } from '../data/seo';
import './LegalPage.css';

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="legal-page__field">
      <dt>{label}</dt>
      <dd>{value ?? <span className="legal-page__missing">[[À COMPLÉTER]]</span>}</dd>
    </div>
  );
}

export function MentionsLegales() {
  const { legal } = etablissement;

  return (
    <main id="main-content" className="legal-page">
      <Seo page={pagesSeo.mentionsLegales} />
      <div className="container">
        <Link className="legal-page__back" to="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Retour au site
        </Link>

        <h1 className="legal-page__title font-display">Mentions légales</h1>
        <p className="legal-page__updated">The Green Man — {etablissement.adresse.formatCourt}</p>

        <section className="legal-page__section">
          <h2>Éditeur du site</h2>
          <dl>
            <Field label="Raison sociale" value={legal.raisonSociale} />
            <Field label="Forme juridique" value={legal.formeJuridique} />
            <Field label="SIRET" value={legal.siret} />
            <Field label="RCS" value={legal.rcs} />
            <Field label="N° TVA intracommunautaire" value={legal.numeroTva} />
            <Field label="Capital social" value={legal.capitalSocial} />
            <Field label="Directeur de la publication" value={legal.directeurPublication} />
          </dl>
        </section>

        <section className="legal-page__section">
          <h2>Hébergeur</h2>
          <dl>
            <Field label="Nom" value={legal.hebergeur.nom} />
            <Field label="Adresse" value={legal.hebergeur.adresse} />
            <Field label="Téléphone" value={legal.hebergeur.telephone} />
          </dl>
        </section>

        <section className="legal-page__section">
          <h2>Licence de débit de boissons</h2>
          <p>
            En tant que débit de boissons, l'établissement est tenu d'afficher sa licence et les
            mentions obligatoires liées à la vente d'alcool.
          </p>
          <dl>
            <Field label="Type et numéro de licence" value={legal.licenceDebitBoissons} />
          </dl>
          <p className="legal-page__notice">
            Obligation légale à remplir avant toute mise en ligne réelle : la licence de débit de
            boissons doit être renseignée ici, et affichée physiquement dans l'établissement,
            conformément au Code de la santé publique.
          </p>
        </section>

        <section className="legal-page__section">
          <h2>Établissement présenté</h2>
          <dl>
            <Field label="Nom" value={etablissement.nom} />
            <Field label="Adresse" value={etablissement.adresse.formatCourt} />
            <Field label="Téléphone" value={etablissement.telephone.affichage} />
          </dl>
          <p>
            Numéro de téléphone relevé sur annuaire professionnel, non confirmé par
            l'établissement — voir <code>docs/SOURCES.md</code>.
          </p>
        </section>

        <p className="legal-page__notice">
          Projet de démonstration non commandité. « The Green Man », sa marque et les contenus
          factuels le concernant appartiennent à leurs propriétaires respectifs.
        </p>
      </div>
    </main>
  );
}
