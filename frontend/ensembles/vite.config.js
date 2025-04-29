import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ensembles',
      filename: 'remoteEntry.js',
      exposes: {
        './EnsemblesApp': './src/App.jsx'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3003
  },
  preview: {
    port: 3003,
  },
  build: {
    target: 'esnext', // Устанавливаем target на esnext
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  }
});
