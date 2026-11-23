// @ts-check
import { defineConfig } from 'astro/config';

// Keep the live site's URL shape (/products, /services, no trailing slash, no .html)
export default defineConfig({
  site: 'https://www.hts.international',
  trailingSlash: 'never',
  build: { format: 'file' },
});
