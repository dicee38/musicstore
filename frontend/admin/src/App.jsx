import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EntityManager from './pages/EntityManager';
import { Provider } from 'react-redux';
import { store } from './store';


export default function AdminApp() {
  return (
    <Provider store={store}>    
     <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:entity" element={<EntityManager />} />
      </Routes>
      </Provider>
 
  );
}
