// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.local',
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
