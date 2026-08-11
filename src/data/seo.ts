/**
 * Métadonnées SEO par page + construction du JSON-LD.
 * Règle stricte : aucun champ non sourcé. Pas d'aggregateRating, pas de geo
 * inventé, pas d'openingHoursSpecification tant que les horaires ne sont pas
 * confirmés dans etablissement.ts (`horairesStatut === 'confirme'`).
 */

import { etablissement } from './etablissement';

export const SITE_URL = 'https://thegreenman-demo.example';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
}

export const pagesSeo: Record<'accueil' | 'mentionsLegales' | 'confidentialite', PageSeo> = {
  accueil: {
    title: 'The Green Man — Bar-restaurant rue Pasteur, Besançon centre-ville',
    description:
      "Bar-restaurant au cœur de Besançon, 21 rue Pasteur : murs en pierre, voûtes et plafond à la française classé. " +
      "Petit déjeuner, plat du jour fait maison, terrasse, cheminée et concerts en petite salle.",
    path: '/',
  },
  mentionsLegales: {
    title: 'Mentions légales — The Green Man Besançon',
    description: 'Mentions légales du site The Green Man, bar-restaurant au 21 rue Pasteur à Besançon.',
    path: '/mentions-legales',
  },
  confidentialite: {
    title: 'Confidentialité — The Green Man Besançon',
    description: "Politique de confidentialité du site vitrine The Green Man, bar-restaurant à Besançon.",
    path: '/confidentialite',
  },
};

export const ogImage = {
  path: '/images/og/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'The Green Man — bar-restaurant, 21 rue Pasteur, Besançon',
};

/**
 * BarOrPub JSON-LD. N'inclut que des champs vérifiés dans etablissement.ts.
 * openingHoursSpecification volontairement omis tant que `horairesStatut !== 'confirme'`.
 */
export function buildJsonLd() {
  const amenityFeature = etablissement.services
    .filter((s) => ['wifi', 'terrasse', 'pmr', 'animaux'].includes(s.id))
    .map((s) => ({
      '@type': 'LocationFeatureSpecification',
      name: s.label,
      value: true,
    }));

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: etablissement.nom,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: etablissement.adresse.rue,
      postalCode: etablissement.adresse.codePostal,
      addressLocality: etablissement.adresse.ville,
      addressCountry: 'FR',
    },
    telephone: etablissement.telephone.affichage,
    servesCuisine: 'Traditionnelle',
    paymentAccepted: etablissement.paiements.join(', '),
    amenityFeature,
    isAccessibleForFree: false,
    sameAs: [etablissement.reseaux.facebook, etablissement.reseaux.instagram],
  };

  // Volontairement absent : aggregateRating, review, geo, openingHoursSpecification,
  // priceRange (aucune donnée fiable disponible pour ces champs).
  return jsonLd;
}
