/**
 * Source unique de vérité pour toutes les données factuelles de l'établissement.
 * Aucune chaîne de texte concernant The Green Man ne doit être écrite en dur
 * ailleurs dans le code : tout composant/section importe ce fichier.
 *
 * Statut des champs :
 *  - valeur renseignée + `statut: 'confirme'`     -> donnée établie par une source citée dans docs/SOURCES.md
 *  - valeur "[[À COMPLÉTER]]" ou `null`           -> donnée manquante, jamais inventée
 *  - `statut: 'a_verifier'`                        -> donnée trouvée mais non confirmée par l'établissement
 *
 * Mise à jour : voir docs/SOURCES.md pour la date de relevé et la fiabilité de chaque source.
 */

export type StatutDonnee = 'confirme' | 'a_verifier' | 'a_completer';

export interface JourHoraire {
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  /** Créneau du service restauration, ex. "12h–14h". `null` = fermé ce jour, à confirmer. */
  service: string | null;
  /** Créneau d'ouverture du bar, ex. "9h–1h". `null` = fermé ce jour, à confirmer. */
  bar: string | null;
}

export interface ServicePratique {
  id: string;
  label: string;
  detail?: string;
}

export interface DonneesLegales {
  raisonSociale: string | null;
  formeJuridique: string | null;
  siret: string | null;
  rcs: string | null;
  numeroTva: string | null;
  capitalSocial: string | null;
  directeurPublication: string | null;
  hebergeur: {
    nom: string | null;
    adresse: string | null;
    telephone: string | null;
  };
  licenceDebitBoissons: string | null;
}

export interface Etablissement {
  nom: string;
  typeEtablissement: string;
  accroche: string;
  formule: string;
  description: string;
  vieDuLieu: {
    texte: string;
    journee: string;
    soiree: string;
    saisons: string;
    source: string;
    statut: StatutDonnee;
  };
  adresse: {
    rue: string;
    codePostal: string;
    ville: string;
    pays: string;
    formatCourt: string;
  };
  telephone: {
    affichage: string;
    lienTel: string;
    statut: StatutDonnee;
    note: string;
  };
  email: string | null;
  reseaux: {
    facebook: string;
    instagram: string;
    siteWeb: string;
  };
  reservationUrl: string | null;
  horaires: JourHoraire[] | null;
  horairesStatut: StatutDonnee;
  situation: {
    description: string;
    parking: string;
  };
  services: ServicePratique[];
  paiements: string[];
  legal: DonneesLegales;
  etablissementVoisin: {
    nom: string;
    description: string;
    lienStatut: StatutDonnee;
  };
}

export const etablissement: Etablissement = {
  nom: 'The Green Man',
  typeEtablissement: 'Bar-restaurant',

  accroche: 'Bar, restaurant, café. Murs en pierre, voûtes, plafond à la française classé.',

  formule: 'Au Green Man on y vient et on y revient.',

  description:
    "Un bar-restaurant chaleureux au style irlandais et à la cuisine traditionnelle, dans un lieu pittoresque du cœur de Besançon. " +
    "Le véritable plafond à la française classé, les murs en pierre et les voûtes font tout son charme : on s'installe l'hiver au coin de la cheminée, l'été sur la petite terrasse. " +
    "Le matin, un café ou un petit déjeuner. Le midi, un plat du jour ou une suggestion présentée sur ardoise, tout fait maison avec des produits frais. " +
    "L'après-midi, un moment de détente en famille ou entre amis. Le soir, une belle gamme de vins ou de bières accompagnés d'assiettes de charcuterie.",

  vieDuLieu: {
    journee:
      "En journée, c'est un lieu de rendez-vous d'habitués : on se love dans le canapé, on boit un café, on bouquine ou on dessine.",
    soiree:
      "En soirée, l'endroit s'anime, en particulier les soirs où il se transforme en mini-salle de concert — peu de place pour les musiciens comme pour le public, mais la proximité facilite les contacts et apporte de la convivialité.",
    saisons: 'Au fil des saisons : soirées fondue, projections de matchs de rugby sur écran géant, repas à partager.',
    get texte() {
      return `${this.journee} ${this.soiree} ${this.saisons}`;
    },
    source: 'Petit Futé',
    statut: 'confirme',
  },

  adresse: {
    rue: '21 rue Pasteur',
    codePostal: '25000',
    ville: 'Besançon',
    pays: 'France',
    formatCourt: '21 rue Pasteur, 25000 Besançon',
  },

  telephone: {
    affichage: '03 81 50 99 59',
    lienTel: 'tel:+33381509959',
    statut: 'a_verifier',
    note: 'Numéro relevé sur annuaire — [[À VÉRIFIER auprès de l\'établissement]]',
  },

  email: null,

  reseaux: {
    facebook: 'https://www.facebook.com/Thegreenmanbar/',
    instagram: 'https://www.instagram.com/thegreenmanbesancon/',
    siteWeb: 'https://thegreenman.fr',
  },

  // Aucun système de réservation en ligne identifié : tant que ce champ est vide,
  // aucun bouton de réservation n'apparaît nulle part sur le site.
  reservationUrl: null,

  // Horaires jour par jour non trouvés (page Facebook et site inaccessibles à la collecte
  // automatisée). Ne jamais déduire d'un agrégateur tiers : rester `null` tant que
  // l'établissement ne les a pas confirmés.
  horaires: null,
  horairesStatut: 'a_completer',

  situation: {
    description:
      "Au cœur de la boucle du Doubs, en centre-ville de Besançon, à proximité du Palais de Justice.",
    parking: 'Parking Mairie à environ 200 m',
  },

  services: [
    { id: 'anglais', label: 'Anglais parlé' },
    { id: 'animaux', label: 'Animaux acceptés' },
    { id: 'pmr', label: 'Accès handicapés' },
    { id: 'wifi', label: 'Wifi' },
    { id: 'terrasse', label: 'Terrasse' },
    { id: 'bar', label: 'Bar' },
    { id: 'cheminee', label: 'Cheminée' },
    { id: 'bottin', label: 'Référencé Bottin Gourmand' },
  ],

  paiements: [
    'Carte bancaire',
    'American Express',
    'Chèques',
    'Chèques déjeuner',
    'Tickets restaurant',
    'Espèces',
    'Devises',
  ],

  legal: {
    raisonSociale: null,
    formeJuridique: null,
    siret: null,
    rcs: null,
    numeroTva: null,
    capitalSocial: null,
    directeurPublication: null,
    hebergeur: {
      nom: null,
      adresse: null,
      telephone: null,
    },
    licenceDebitBoissons: null,
  },

  etablissementVoisin: {
    nom: 'The Green Mama',
    description:
      "Des retours clients mentionnent un établissement voisin, « The Green Mama », qui servirait des pizzas en face du Green Man. " +
      "Aucun lien capitalistique ou commercial confirmé entre les deux établissements.",
    lienStatut: 'a_verifier',
  },
};

export interface ElementBatiment {
  id: 'plafond' | 'voutes' | 'pierre';
  titre: string;
  texte: string;
}

/**
 * Les trois faits établis sur le bâtiment (aucun autre détail — pas de date,
 * pas d'architecte, pas d'historique — n'a été trouvé ni ne doit être ajouté).
 * Alimente la section Voûtes, un fait par arche.
 */
export const elementsBatiment: ElementBatiment[] = [
  {
    id: 'plafond',
    titre: 'Le plafond à la française',
    texte: 'Un véritable plafond à la française, classé — la pièce maîtresse du lieu.',
  },
  {
    id: 'voutes',
    titre: 'Les voûtes',
    texte: 'Des voûtes en pierre, comme une enfilade sous laquelle avancer, salle après salle.',
  },
  {
    id: 'pierre',
    titre: 'La pierre',
    texte: 'Des murs en pierre, dans un lieu pittoresque au cœur de Besançon.',
  },
];

/**
 * Texte général sur la figure du Green Man (motif architectural documenté,
 * non spécifique à ce bâtiment). Aucune affirmation historique sur une
 * sculpture précise de cet établissement — voir docs/SOURCES.md.
 */
export const figureDuGreenMan = {
  texte:
    "Le Green Man est une figure que l'on retrouve sculptée dans l'architecture médiévale européenne : " +
    "un visage d'où poussent des feuilles, gravé dans les clés de voûte et les chapiteaux des bâtiments en pierre, " +
    "traditionnellement associé à la végétation et au renouveau. " +
    "Le nom de l'établissement lui emprunte directement cette image — un visage de pierre et de feuillage, " +
    "comme les murs et les voûtes qui l'entourent ici.",
};
