import React, { useMemo, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Container, AppBar, Toolbar, Typography, Button, Stack,
  ThemeProvider, CssBaseline, IconButton
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import AdminDashboard from './pages/AdminDashboard';
import EntityManager from './pages/EntityManager';

const routes = [
  { path: 'vinyls', entity: 'records', label: 'Пластинки' },
  { path: 'songs', entity: 'compositions', label: 'Произведения' },
  { path: 'bands', entity: 'ensembles', label: 'Ансамбли' },
  { path: 'artists', entity: 'musicians', label: 'Музыканты' },
  { path: 'labels', entity: 'companies', label: 'Лейблы' },
];

export default function App({ mode: initialMode = 'light' }) {
  const location = useLocation();
  const [mode, setMode] = useState(initialMode);

  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#ff5722' },
      background: { default: mode === 'light' ? '#fafafa' : '#121212' }
    }
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Административная панель</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              color="inherit"
              component={Link}
              to="/admin"
              variant={location.pathname === '/admin' || location.pathname === '/admin/' ? 'outlined' : 'text'}
            >
              Статистика
            </Button>
            {routes.map(({ path, label }) => (
              <Button
                key={path}
                color="inherit"
                component={Link}
                to={`/admin/${path}`}
                variant={location.pathname.includes(path) ? 'outlined' : 'text'}
              >
                {label}
              </Button>
            ))}
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          {routes.map(({ path, entity }) => (
            <Route key={path} path={path} element={<EntityManager entity={entity} />} />
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
