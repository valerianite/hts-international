// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep the old site's URL shape (/products, /services, no trailing slash, no .html)
export default defineConfig({
  site: 'https://www.hts.international',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // never list the 404 page
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
});
