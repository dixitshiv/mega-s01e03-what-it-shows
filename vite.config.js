import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import path from 'node:path';
export default defineConfig({ plugins: [sveltekit({
  extensions: ['.svelte', '.svx'],
  preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], layout: { runbook: path.resolve('src/lib/layouts/runbook.svelte') } })],
  adapter: adapter(), alias: { '#lib': 'src/lib' }
})] });
