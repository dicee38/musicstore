import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopSalesPage from './pages/TopSalesPage';

export default function TopApp() {
  return (
      <Routes>
        <Route path="/" element={<TopSalesPage />} />
      </Routes>
  );
}
