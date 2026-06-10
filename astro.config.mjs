// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://donations.pages.dev',
  integrations: [
    svelte({extensions:['.svelte']}), 
    sitemap(),
  ],
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  vite:{
    css:{
      transformer:'postcss'
    },
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
                project: "./project.inlang",
                outdir: "./src/paraglide",
            }),
    ]
  },
  
});