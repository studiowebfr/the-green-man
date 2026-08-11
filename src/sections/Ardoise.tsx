import { Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SlateBoard } from '../components/SlateBoard';
import { Button } from '../components/Button';
import { carte } from '../data/carte';
import { etablissement } from '../data/etablissement';
import './Ardoise.css';

const MOMENT_LABELS: Record<string, string> = {
  matin: 'Le matin',
  midi: 'Le midi',
  soir: 'Le soir',
};

/**
 * Le plat du jour et les suggestions du midi. Tant que carte.ts est vide
 * (aucune carte fiable trouvée), la section ne meurt pas : elle affiche ce
 * qui est établi et renvoie au téléphone / à Facebook pour le détail du jour.
 */
export function Ardoise() {
  const hasCarte = carte.plats.length > 0;

  const plansByMoment = hasCarte
    ? carte.plats.reduce<Record<string, typeof carte.plats>>((acc, plat) => {
        (acc[plat.moment] ??= []).push(plat);
        return acc;
      }, {})
    : {};

  return (
    <section id="ardoise" className="ardoise section">
      <div className="container ardoise__grid">
        <Reveal className="ardoise__intro">
          <p className="eyebrow">L'ardoise</p>
          <h2 className="font-display">Le midi, à l'ardoise</h2>
          <p>
            Tout est fait maison, avec des produits frais : un plat du jour et des suggestions
            présentées sur ardoise, qui changent chaque jour.
          </p>
        </Reveal>

        <Reveal className="ardoise__board-wrap">
          <SlateBoard>
            {hasCarte ? (
              Object.entries(plansByMoment).map(([moment, plats]) => (
                <div key={moment} className="ardoise__moment">
                  <p className="ardoise__moment-label">{MOMENT_LABELS[moment] ?? moment}</p>
                  <ul>
                    {plats.map((plat) => (
                      <li key={plat.id} className="ardoise__item">
                        <span>{plat.nom}</span>
                        {plat.prix != null && <span className="ardoise__price">{plat.prix} €</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <ul className="ardoise__facts">
                {carte.faitsEtablis.map((fait) => (
                  <li key={fait}>{fait}</li>
                ))}
              </ul>
            )}
          </SlateBoard>

          {!hasCarte && (
            <p className="ardoise__renvoi">
              La carte du jour n'est pas publiée en ligne — appelez-nous ou consultez notre
              Facebook pour les suggestions du moment.
              <span className="ardoise__renvoi-actions">
                <Button as="a" variant="outline" href={etablissement.telephone.lienTel}>
                  <Phone size={16} aria-hidden="true" />
                  {etablissement.telephone.affichage}
                </Button>
                <Button as="a" variant="ghost" href={etablissement.reseaux.facebook} target="_blank" rel="noopener noreferrer">
                  Voir Facebook
                </Button>
              </span>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
