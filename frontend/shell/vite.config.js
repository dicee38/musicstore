import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        auth: 'http://localhost:3001/assets/remoteEntry.js',
        records: 'http://localhost:3002/assets/remoteEntry.js',
        ensembles: 'http://localhost:3003/assets/remoteEntry.js',
        compositions: 'http://localhost:3004/assets/remoteEntry.js',
        top: 'http://localhost:3005/assets/remoteEntry.js',
        admin: 'http://localhost:3006/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3000
  },
  preview: {
    port: 3000,
  },
  build: {
    target: 'esnext', // Устанавливаем target на esnext
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  }
});
  