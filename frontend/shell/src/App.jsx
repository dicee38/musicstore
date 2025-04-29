import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';

const AuthApp = React.lazy(() => import('auth/AuthApp'));
const CompositionsApp = React.lazy(() => import('compositions/CompositionsApp'));
const EnsemblesApp = React.lazy(() => import('ensembles/EnsemblesApp'));
const RecordsApp = React.lazy(() => import('records/RecordsApp'));
const TopApp = React.lazy(() => import('top/TopApp'));


export default function App() {
  return (
    <div>
      <Header />
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/auth/*" element={<AuthApp/>} />
        <Route path="/compositions/*" element={<CompositionsApp/>} />
        <Route path="/ensembles/*" element={<EnsemblesApp/>} />
        <Route path="/records/*" element={<RecordsApp/>} />
        <Route path="/top/*" element={<TopApp/>} />
        </Routes>
      </Suspense>
    </div>
  );
}
