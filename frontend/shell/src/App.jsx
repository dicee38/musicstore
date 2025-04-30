import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { Box, CircularProgress, Container } from '@mui/material';
import HomePage from './pages/HomePage'; 

// Ленивая загрузка микрофронтендов
const AuthApp = React.lazy(() => import('auth/AuthApp'));
const CompositionsApp = React.lazy(() => import('compositions/CompositionsApp'));
const EnsemblesApp = React.lazy(() => import('ensembles/EnsemblesApp'));
const RecordsApp = React.lazy(() => import('records/RecordsApp'));
const TopApp = React.lazy(() => import('top/TopApp'));
const AdminApp = React.lazy(() => import('admin/AdminApp'));

// Создаем кастомную тему
const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // Тёмно-зеленый
    },
    secondary: {
      main: '#ff5722', // Оранжевый
    },
    background: {
      default: '#fafafa', // Светлый фон
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 'bold',
    },
    body1: {
      fontWeight: 'normal',
    },
  },
});

export default function App() {
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
                backgroundColor: theme.palette.background.default, // используем кастомный фон
              }}
            >
              <CircularProgress sx={{ color: theme.palette.primary.main }} />
            </Box>
          }
        >
          <Container sx={{ marginTop: 2 }}>
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* Главная страница */}
              <Route path="/auth/*" element={<AuthApp />} />
              <Route path="/compositions/*" element={<CompositionsApp />} />
              <Route path="/ensembles/*" element={<EnsemblesApp />} />
              <Route path="/records/*" element={<RecordsApp />} />
              <Route path="/top/*" element={<TopApp />} />
              <Route path="/admin/*" element={<AdminApp />} />
            </Routes>
          </Container>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}
