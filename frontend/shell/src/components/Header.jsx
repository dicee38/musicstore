import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

export default function Header() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #42a5f5, #1976d2)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{ fontWeight: 'bold', letterSpacing: '1px' }}
        >
          Музыкальный магазин
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{ color: '#fff', marginRight: '1rem', fontSize: isMobile ? '0.75rem' : '1rem' }}
          >
            Добро пожаловать
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
