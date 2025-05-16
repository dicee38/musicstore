import React from 'react';
import { useRoutes } from 'react-router-dom';
import CompositionListPage from './pages/CompositionListPage';
import CompositionDetailPage from './pages/CompositionDetailPage';

export default function CompositionsApp() {
  const routes = [
    { path: '/', element: <CompositionListPage /> },
    { path: '/:id', element: <CompositionDetailPage /> },
  ];

  return useRoutes(routes);
}
