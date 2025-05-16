import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
  name: 'shell',
  exposes: {
    './store': './src/store/index.js',
    './store/cartSlice': './src/store/cartSlice.js',
  },
  remotes: {
    auth: 'http://localhost:3001/assets/remoteEntry.js',
    records: 'http://localhost:3002/assets/remoteEntry.js',
    ensembles: 'http://localhost:3003/assets/remoteEntry.js',
    compositions: 'http://localhost:3004/assets/remoteEntry.js',
    top: 'http://localhost:3005/assets/remoteEntry.js',
    admin: 'http://localhost:3006/assets/remoteEntry.js'
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
    'react-router-dom': { singleton: true, requiredVersion: '^6.0.0' },
    'react-redux': { singleton: true, requiredVersion: '^8.0.0' },
    '@reduxjs/toolkit': { singleton: true, requiredVersion: '^1.9.0' },
    '@mui/material': { singleton: true, requiredVersion: '^5.0.0' },
    '@emotion/react': { singleton: true, requiredVersion: '^11.0.0' },
    '@emotion/styled': { singleton: true, requiredVersion: '^11.0.0' },
  }
})

  ],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  }
});
