import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/App.jsx',
        './store/userSlice': './src/store/userSlice.js' 
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit']
    })
  ],
  server: {
    port: 3001
  },
  preview: {
    port: 3001,
  },
  build: {
    target: 'esnext',        // <--- Ключевая строка
    modulePreload: false,    // Рекомендуется для federation
    cssCodeSplit: false,     // Не обязательно, но помогает избежать ошибок с CSS
    minify: false            // Для отладки можно отключить минификацию
  }
});
