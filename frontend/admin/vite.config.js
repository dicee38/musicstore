import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './AdminApp': './src/App.jsx'
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit']
    })
  ],
  server: {
    port: 3006
  },
  preview: {
    port: 3006,
  },
  build: {
    target: 'esnext',        // <--- Ключевая строка
    modulePreload: false,    // Рекомендуется для federation
    cssCodeSplit: false,     // Не обязательно, но помогает избежать ошибок с CSS
    minify: false            // Для отладки можно отключить минификацию
  }
});
