import { useEffect } from 'react';
import { ogImage, SITE_URL, type PageSeo } from '../data/seo';

export interface SeoProps {
  page: PageSeo;
  /** JSON-LD BarOrPub — uniquement sur la page d'accueil, voir data/seo.ts buildJsonLd(). */
  jsonLd?: Record<string, unknown>;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Gestion du <head> sans dépendance externe (pas de react-helmet) : titre,
 * meta description, Open Graph, Twitter Card, canonical, et JSON-LD optionnel.
 * Un seul <h1> par page reste porté par le composant de page lui-même.
 */
export function Seo({ page, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', `${SITE_URL}${page.path}`);
    setMeta('property', 'og:image', `${SITE_URL}${ogImage.path}`);
    setMeta('property', 'og:image:width', String(ogImage.width));
    setMeta('property', 'og:image:height', String(ogImage.height));
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', `${SITE_URL}${ogImage.path}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${page.path}`);

    let script = document.getElementById('jsonld-schema') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'jsonld-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else {
      script?.remove();
    }
  }, [page, jsonLd]);

  return null;
}
