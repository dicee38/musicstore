import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'records',
      filename: 'remoteEntry.js',
      remotes: {
    shell: 'http://localhost:3000/assets/remoteEntry.js'
  },
      exposes: {
        './RecordsApp': './src/App.jsx'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3002
  },
  preview: {
    port: 3002,
  },
  build: {
    target: 'esnext', // Устанавливаем target на esnext
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  }
});
