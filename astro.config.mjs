// @ts-check
import { defineConfig } from 'astro/config';
import customTheme from './foldster-theme.json';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://foldsters.com",
  markdown: {
    shikiConfig: {
      theme: customTheme
    }
  },
  prefetch: true,
  output: "static",
  integrations: [react()],
});
