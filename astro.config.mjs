// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  site:"https://klarivika.github.io",
  integrations: [
    svelte({extensions:['.svelte']}), 
    sitemap()
],
  vite:{
    css:{
        transformer:'postcss'
    },

    plugins: [tailwindcss()]
  }
});