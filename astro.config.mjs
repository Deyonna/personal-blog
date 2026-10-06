// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: because this repo is "personal-blog", GitHub Pages serves the site
// from the subpath /personal-blog/. `site` + `base` below make every internal
// link and asset resolve correctly in production. If you later rename the repo
// to "deyonna.github.io", change base to '/' and site to 'https://deyonna.github.io'.
export default defineConfig({
  site: 'https://deyonna.github.io',
  base: '/personal-blog',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Syntax-highlighting theme for code blocks.
      theme: 'github-dark',
      wrap: true,
    },
  },
});
