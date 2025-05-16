import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login } from './store/index'; // путь поправь при необходимости

import Header from './components/Header';
import Navigation from './components/Navigation';
import { Box, CircularProgress, Container } from '@mui/material';
import HomePage from './pages/Homepage.jsx';

// Защищённые маршруты
import PrivateRoute from './router/PrivateRoute';
import AdminRoute from './router/AdminRoute';

// Ленивая загрузка микрофронтендов
const AuthApp = React.lazy(() => import('auth/AuthApp'));
const CompositionsApp = React.lazy(() => import('compositions/CompositionsApp'));
const EnsemblesApp = React.lazy(() => import('ensembles/EnsemblesApp'));
const RecordsApp = React.lazy(() => import('records/RecordsApp'));
const TopApp = React.lazy(() => import('top/TopApp'));
const AdminApp = React.lazy(() =>
  import('admin/AdminApp').then((m) => ({ default: m.default || m }))
);

// Кастомная тема
const theme = createTheme({
  palette: {
    primary: { main: '#00796b' },
    secondary: { main: '#ff5722' },
    background: { default: '#fafafa' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontWeight: 'bold' },
    body1: { fontWeight: 'normal' },
  },
});

export default function App() {
  const dispatch = useDispatch();

  // 🔁 Восстановление авторизации при загрузке
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');

    if (token && role && email) {
      dispatch(login({ token, role, email }));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Navigation />
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh',
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <CircularProgress sx={{ color: theme.palette.primary.main }} />
              </Box>
            }
          >
            <Container sx={{ marginTop: 2 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/*" element={<AuthApp />} />
                <Route path="/compositions/*" element={<CompositionsApp />} />
                <Route path="/ensembles/*" element={<EnsemblesApp />} />
                <Route path="/records/*" element={<RecordsApp />} />
                <Route path="/top/*" element={<TopApp />} />

                {/* 🔒 Только авторизованные */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <div>Страница профиля</div>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <div>Корзина</div>
                    </PrivateRoute>
                  }
                />

                {/* 👑 Только для админа */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <AdminApp />
                    </AdminRoute>
                  }
                />
              </Routes>
            </Container>
          </Suspense>
        </div>
    </ThemeProvider>
  );
}
