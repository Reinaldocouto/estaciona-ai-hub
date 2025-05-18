/// <reference types="@types/google.maps" />

// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => {
  // carrega .env.* para pegar uma flag que definimos abaixo
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_PUBLIC_BASE || '/',          // 👈 dinâmica

    server: {
      host: '::',
      port: 8080,
    },

    plugins: [react(), mode === 'development' && componentTagger()].filter(
      Boolean,
    ),

    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  };
});
