// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  vite: {
    build: {
      // ⚠️ もしこの記述があったら削除してください
      // assetsInlineLimit: 12288, 
    },
  },
});