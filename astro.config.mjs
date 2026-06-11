// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://forjahead.com',
  vite: {
    plugins: [tailwindcss()]
  }
});