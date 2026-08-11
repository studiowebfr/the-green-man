/**
 * La carte réelle de The Green Man n'a pas pu être récupérée (page Facebook et
 * site thegreenman.fr inaccessibles à la collecte automatisée). Ce fichier définit
 * la structure typée prête à recevoir les vraies données, mais reste VIDE tant
 * qu'elles ne sont pas confirmées par l'établissement.
 *
 * Ne jamais remplir ce fichier à partir d'un avis client, d'un agrégateur, ou
 * d'une supposition — même plausible. Un burger ou une pizza mentionnés dans un
 * avis ne sont pas une carte.
 *
 * Pour intégrer la vraie carte : ajouter des entrées à `plats` (et/ou `boissons`)
 * en respectant les types ci-dessous, puis mettre à jour `dateReleve`.
 */

export type MomentService = 'matin' | 'midi' | 'soir';

export interface PlatCarte {
  id: string;
  nom: string;
  description?: string;
  prix?: number;
  moment: MomentService;
  suggestionDuJour?: boolean;
}

export interface BoissonCarte {
  id: string;
  nom: string;
  categorie: 'vin' | 'biere' | 'autre';
  description?: string;
  prix?: number;
}

export interface Carte {
  /** Date ISO du dernier relevé de la carte, à mettre à jour à chaque ajout. */
  dateReleve: string | null;
  plats: PlatCarte[];
  boissons: BoissonCarte[];
  /** Faits établis sur la carte, sans détail chiffré ni nommé — utilisables tant que `plats`/`boissons` sont vides. */
  faitsEtablis: string[];
}

export const carte: Carte = {
  dateReleve: null,
  plats: [],
  boissons: [],
  faitsEtablis: [
    'Tout est fait maison, avec des produits frais.',
    "Le midi : un plat du jour et des suggestions présentées sur ardoise.",
    'Le soir : une belle gamme de vins et de bières, accompagnés d\'assiettes de charcuterie.',
    'Le matin : café et petit déjeuner.',
  ],
};
