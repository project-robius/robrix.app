import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://robrix.app',
  trailingSlash: 'never',
  integrations: [
    sitemap(),
    icon({ iconDir: 'src/icons' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
