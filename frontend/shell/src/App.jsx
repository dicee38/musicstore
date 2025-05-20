import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from './store/index';

import Header from './components/Header';
import Navigation from './components/Navigation';
import { Box, CircularProgress, Container } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import HomePage from './pages/Homepage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';

// Защищённые маршруты
import PrivateRoute from './router/PrivateRoute';
import AdminRoute from './router/AdminRoute';

// Микрофронтенды
const AuthApp = React.lazy(() => import('auth/AuthApp'));
const CompositionsApp = React.lazy(() => import('compositions/CompositionsApp'));
const EnsemblesApp = React.lazy(() => import('ensembles/EnsemblesApp'));
const RecordsApp = React.lazy(() => import('records/RecordsApp'));
const TopApp = React.lazy(() => import('top/TopApp'));
const AdminApp = React.lazy(() => import('admin/AdminApp'));

export default function App() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    if (token && role && email) {
      dispatch(login({ token, role, email }));
    }
  }, []);

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#00796b' },
      secondary: { main: '#ff5722' },
      background: { default: mode === 'light' ? '#fafafa' : '#121212' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h1: { fontWeight: 'bold' },
      body1: { fontWeight: 'normal' },
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>

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

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                }
              />

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
