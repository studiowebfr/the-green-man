import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // '/' pour le dev local, Netlify et Vercel (servis à la racine du domaine).
  // GitHub Pages sert ce dépôt sous /the-green-man/ : `npm run build:gh-pages`
  // (vite build --mode gh-pages) l'active pour cette seule commande, sans
  // changer le comportement par défaut de `npm run dev` / `npm run build`.
  base: mode === 'gh-pages' ? '/the-green-man/' : '/',
  plugins: [react()],
}))
