import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'records',
      filename: 'remoteEntry.js',
      exposes: {
        './RecordsApp': './src/App.jsx'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.0.0',
        },
      }
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
