// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site:"https://klarivika.github.io/donations",
  integrations: [
    svelte({extensions:['.svelte']}), 
    sitemap(),
  ],
  vite:{
    css:{
      transformer:'postcss'
    },
    output: "server",
   adapter: node({ mode: "standalone" }),
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
				project: "./project.inlang",
				outdir: "./src/paraglide",
			}),
    ]
  },
  
});