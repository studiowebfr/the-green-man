import { Suspense, lazy } from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { Hero } from '../sections/Hero';
import { Voutes } from '../sections/Voutes';
import { Feuillage } from '../sections/Feuillage';
import { Ardoise } from '../sections/Ardoise';
import { Comptoir } from '../sections/Comptoir';
import { Grain } from '../components/Grain';
import { Cursor } from '../components/Cursor';
import { Seo } from '../components/Seo';
import { useLenis } from '../hooks/useLenis';
import { pagesSeo, buildJsonLd } from '../data/seo';

// Sections basses : hors-écran au chargement, chargées en JS séparé pour ne
// pas peser sur le bundle initial (budget < 180 Ko gzip) — voir docs/DESIGN.md
// §Performance. Voûtes/Feuillage/Ardoise/Comptoir restent statiques : plus
// proches du pli, et Voûtes a besoin de ScrollTrigger dès l'arrivée sur site.
const Scene = lazy(() => import('../sections/Scene').then((m) => ({ default: m.Scene })));
const Saisons = lazy(() => import('../sections/Saisons').then((m) => ({ default: m.Saisons })));
const Pratique = lazy(() => import('../sections/Pratique').then((m) => ({ default: m.Pratique })));
const Pasteur = lazy(() => import('../sections/Pasteur').then((m) => ({ default: m.Pasteur })));
const Contact = lazy(() => import('../sections/Contact').then((m) => ({ default: m.Contact })));

export function Home() {
  useLenis();

  return (
    <>
      <Seo page={pagesSeo.accueil} jsonLd={buildJsonLd()} />
      <Grain />
      <Cursor />
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Voutes />
        <Feuillage />
        <Ardoise />
        <Comptoir />
        <Suspense fallback={null}>
          <Scene />
          <Saisons />
          <Pratique />
          <Pasteur />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
