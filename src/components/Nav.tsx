import { NAV_ITEMS } from '../layout/navItems';
import './Nav.css';

/** Navigation desktop — masquée sous le seuil mobile, voir Nav.css. */
export function Nav() {
  return (
    <nav className="nav" aria-label="Navigation principale">
      <ul className="nav__list">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a className="nav__link" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
