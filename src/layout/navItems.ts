/** Libellés de navigation — IA du site, pas des données factuelles sur l'établissement. */
export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Le lieu', href: '#voutes' },
  { label: "L'ardoise", href: '#ardoise' },
  { label: 'Les concerts', href: '#scene' },
  { label: 'Infos pratiques', href: '#pratique' },
];
