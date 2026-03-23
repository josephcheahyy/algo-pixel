import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/algo-pixel/',
    plugins: [react(), tailwindcss()],
    // NOTE: No secrets in the `define` block — this compiles them as plaintext
    // string literals in the JS bundle. If you ever need Gemini, proxy through
    // a serverless function (Cloud Run / Cloudflare Worker) that holds the key
    // server-side and never ships it to the client.
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
