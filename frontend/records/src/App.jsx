import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecordListPage from './pages/RecordListPage';
import RecordDetailPage from './pages/RecordDetailPage';

import { Provider } from 'react-redux';
import store from 'shell/store'; // 👈 импорт store из shell

export default function RecordsApp() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<RecordListPage />} />
        <Route path="/:id" element={<RecordDetailPage />} />
      </Routes>
    </Provider>
  );
}
