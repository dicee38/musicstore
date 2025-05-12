import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnsembleListPage from './pages/EnsembleListPage';
import EnsembleDetailPage from './pages/EnsembleDetailPage';

export default function EnsemblesApp() {
  return (
      <Routes>
        <Route path="/" element={<EnsembleListPage />} />
        <Route path="/ensembles/:id" element={<EnsembleDetailPage />} />
      </Routes>
   
  );
}
