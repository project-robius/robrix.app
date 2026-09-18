import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  /* Production is robrix.app. The deploy workflow sets SITE_URL to stage the site
     on another host, and anything built for a host other than robrix.app tells
     search engines to stay out — see Base.astro and src/pages/robots.txt.ts. */
  site: process.env.SITE_URL ?? 'https://robrix.app',
  trailingSlash: 'never',
  integrations: [
    sitemap(),
    icon({ iconDir: 'src/icons' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
