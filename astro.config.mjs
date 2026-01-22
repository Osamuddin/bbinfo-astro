// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://bbinfoindia.com',
  integrations: [tailwind(), sitemap()],
  
});