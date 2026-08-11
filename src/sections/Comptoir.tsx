import { Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { Button } from '../components/Button';
import { carte } from '../data/carte';
import { etablissement } from '../data/etablissement';
import './Comptoir.css';

/**
 * Le soir : vins, bières, assiettes de charcuterie. Ambiance la plus sombre
 * du site, lumière de cheminée. Aucune référence de vin ni de bière nommée
 * tant qu'elle n'est pas fournie — voir data/carte.ts (boissons, vide).
 */
export function Comptoir() {
  const hasBoissons = carte.boissons.length > 0;

  return (
    <section id="comptoir" className="comptoir">
      <div className="comptoir__media">
        <PlaceholderImage
          src="/images/comptoir/cheminee-allumee.jpg"
          alt="La cheminée allumée, ambiance du soir"
          width={1200}
          height={1500}
          sizes="100vw"
          cover
        />
        <div className="comptoir__scrim" aria-hidden="true" />
      </div>

      <div className="container comptoir__content">
        <Reveal>
          <p className="eyebrow">Le soir</p>
          <h2 className="font-display">Au comptoir</h2>
          <p className="comptoir__text">
            Une belle gamme de vins et de bières, accompagnés d'assiettes de charcuterie — à la
            lumière de la cheminée.
          </p>

          {hasBoissons ? (
            <ul className="comptoir__list">
              {carte.boissons.map((boisson) => (
                <li key={boisson.id}>
                  <span>{boisson.nom}</span>
                  {boisson.prix != null && <span className="comptoir__price">{boisson.prix} €</span>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="comptoir__renvoi">
              <p>La sélection du moment se demande sur place ou par téléphone.</p>
              <div className="comptoir__actions">
                <Button as="a" variant="outline" href={etablissement.telephone.lienTel}>
                  <Phone size={16} aria-hidden="true" />
                  {etablissement.telephone.affichage}
                </Button>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
