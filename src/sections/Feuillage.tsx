import { Reveal } from '../components/Reveal';
import { Arch } from '../components/Arch';
import { PlaceholderImage } from '../components/PlaceholderImage';
import { figureDuGreenMan } from '../data/etablissement';
import './Feuillage.css';

/**
 * La figure du Green Man et ce que le nom raconte. Section courte et dense,
 * sans surcharge érudite. Aucune affirmation sur une sculpture précise de ce
 * bâtiment — voir docs/etablissement.ts (figureDuGreenMan) et docs/SOURCES.md.
 */
export function Feuillage() {
  return (
    <section id="feuillage" className="feuillage section">
      <div className="container feuillage__grid">
        <Reveal className="feuillage__media">
          <div className="feuillage__arch-mark" aria-hidden="true">
            <Arch variant="entrouverte" />
          </div>
          <PlaceholderImage
            src="/images/feuillage/pierre-sculptee.jpg"
            alt="Détail de pierre taillée, clé de voûte"
            width={1000}
            height={1000}
            sizes="(min-width: 900px) 40vw, 90vw"
          />
        </Reveal>

        <Reveal className="feuillage__text">
          <p className="eyebrow">Le nom</p>
          <h2 className="font-display">La figure du Green Man</h2>
          <p>{figureDuGreenMan.texte}</p>
        </Reveal>
      </div>
    </section>
  );
}
