import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompositionListPage from './pages/CompositionListPage';
import CompositionDetailPage from './pages/CompositionDetailPage';

export default function CompositionsApp() {
  return (
      <Routes>
        <Route path="/" element={<CompositionListPage />} />
        <Route path="/compositions/:id" element={<CompositionDetailPage />} />
      </Routes>
  );
}
