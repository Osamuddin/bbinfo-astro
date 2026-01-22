// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  vite: {
    build: {
      // ⚠️ もしこの記述があったら削除してください
      // assetsInlineLimit: 12288, 
    },
  },
});