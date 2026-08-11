/**
 * La programmation de concerts et événements de The Green Man est annoncée sur
 * leur page Facebook. Aucune date, aucun nom d'artiste n'ayant pu être confirmé
 * par une source fiable, ce fichier reste VIDE par défaut.
 *
 * Tant qu'il est vide, la section Scene affiche un renvoi vers Facebook plutôt
 * qu'un bloc mort — voir src/sections/Scene.
 *
 * Pour ajouter un événement : ajouter une entrée à `evenements` en respectant
 * le type ci-dessous.
 */

export type TypeEvenement = 'concert' | 'soiree-fondue' | 'projection-rugby' | 'repas-partage' | 'autre';

export interface Evenement {
  id: string;
  titre: string;
  type: TypeEvenement;
  /** Date ISO (YYYY-MM-DD). */
  date: string;
  heure?: string;
  description?: string;
}

export const evenements: Evenement[] = [];
