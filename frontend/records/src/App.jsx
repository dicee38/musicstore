import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecordListPage from './pages/RecordListPage';
import RecordDetailPage from './pages/RecordDetailPage';

export default function RecordsApp() {
  return (
      <Routes>
        <Route path="/" element={<RecordListPage />} />
        <Route path="/records/:id" element={<RecordDetailPage />} />
      </Routes>
  );
}
