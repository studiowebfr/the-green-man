import { useEffect, useRef, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { NAV_ITEMS } from '../layout/navItems';
import { etablissement } from '../data/etablissement';
import './MobileMenu.css';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Bouton qui ouvre/ferme le menu — reçoit le focus à la fermeture. */
  triggerRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Menu plein écran mobile : focus trap, fermeture à Échap, scroll verrouillé,
 * retour du focus au déclencheur à la fermeture.
 */
export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : [];
    focusables[0]?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open, triggerRef]);

  // Portail vers #root (pas document.body) : .site-header est position:fixed
  // avec son propre z-index, ce qui crée un contexte d'empilement local — un
  // enfant du <header> y resterait piégé et son z-index ne se comparerait
  // qu'à celui de la barre d'en-tête (auto), pas au reste de la page. #root
  // porte isolation:isolate (reset.css) : un portail vers document.body
  // sortirait de cette frontière et perdrait, lui, face au --z-header malgré
  // sa valeur plus haute. Rester enfant de #root règle les deux problèmes.
  const portalTarget = document.getElementById('root') ?? document.body;
  return createPortal(
    <div
      id="mobile-menu"
      ref={panelRef}
      className={`mobile-menu${open ? ' mobile-menu--open' : ''}`}
      inert={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <nav className="mobile-menu__nav" aria-label="Navigation principale">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={onClose}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a className="mobile-menu__tel" href={etablissement.telephone.lienTel} onClick={onClose}>
        {etablissement.telephone.affichage}
      </a>

      <div className="mobile-menu__social">
        <a href={etablissement.reseaux.facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href={etablissement.reseaux.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </div>,
    portalTarget,
  );
}
