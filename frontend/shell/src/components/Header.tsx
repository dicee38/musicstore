import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #42a5f5, #1976d2)', // Плавный градиент
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Тень для глубины
        transition: 'all 0.3s ease', // Плавный переход
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: '1px' }}>
          Музыкальный магазин
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#fff', marginRight: '1rem' }}>
            Добро пожаловать
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
