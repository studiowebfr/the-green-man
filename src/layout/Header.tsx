import { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Nav } from '../components/Nav';
import { MobileMenu } from '../components/MobileMenu';
import { Button } from '../components/Button';
import { etablissement } from '../data/etablissement';
import './Header.css';

const COMPACT_THRESHOLD = 72;

/**
 * En-tête fixe : se compacte au scroll, inverse son contraste quand une
 * section marquée data-header-contrast="light" occupe le centre du viewport,
 * et porte le déclencheur du menu plein écran mobile.
 */
export function Header() {
  const [compact, setCompact] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCompact(window.scrollY > COMPACT_THRESHOLD);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-header-contrast="light"]'));
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setIsLight(visible.size > 0);
      },
      { rootMargin: '-96px 0px -70% 0px' },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const headerClass = [
    'site-header',
    compact && 'site-header--compact',
    isLight && 'site-header--light',
    menuOpen && 'site-header--menu-open',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
      <div className="site-header__bar container">
        <a className="site-header__logo font-display" href="#hero">
          {etablissement.nom}
        </a>

        <Nav />

        <div className="site-header__actions">
          <Button as="a" variant="outline" className="site-header__tel" href={etablissement.telephone.lienTel}>
            <Phone size={16} aria-hidden="true" />
            {etablissement.telephone.affichage}
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <a className="call-bar" href={etablissement.telephone.lienTel}>
        <Phone size={18} aria-hidden="true" />
        Appeler — {etablissement.telephone.affichage}
      </a>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={toggleRef} />
    </header>
  );
}
