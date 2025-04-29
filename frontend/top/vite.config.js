import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'top',
      filename: 'remoteEntry.js',
      exposes: {
        './TopApp': './src/App.jsx'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3005
  },
  preview: {
    port: 3005,
  },
  build: {
    target: 'esnext', // Устанавливаем target на esnext
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  }
});
