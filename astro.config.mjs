// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  vite: {
    build: {
      // 10kb以下のファイルはインライン化（埋め込み）する設定
      // これにより、8.0KiBのCSSファイルリクエストが消えます
      assetsInlineLimit: 12288, 
    },
  },
});