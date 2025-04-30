import React from 'react';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        backgroundColor: '#f4f6f8',
        padding: '1rem 0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Button
        component={Link}
        to="/"
        variant="text"
        sx={{
          color: '#00796b',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#00796b',
            color: '#fff',
          },
        }}
      >
        Главная
      </Button>
      <Button
        component={Link}
        to="/auth"
        variant="text"
        sx={{
          color: '#00796b',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#00796b',
            color: '#fff',
          },
        }}
      >
        Авторизация
      </Button>
      <Button
        component={Link}
        to="/records"
        variant="text"
        sx={{
          color: '#00796b',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#00796b',
            color: '#fff',
          },
        }}
      >
        Каталог пластинок
      </Button>
      <Button
        component={Link}
        to="/ensembles"
        variant="text"
        sx={{
          color: '#00796b',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#00796b',
            color: '#fff',
          },
        }}
      >
        Ансамбли
      </Button>
      <Button
        component={Link}
        to="/compositions"
        variant="text"
        sx={{
          color: '#00796b',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#00796b',
            color: '#fff',
          },
        }}
      >
        Композиции
      </Button>
      <Button
        component={Link}
        to="/top"
        variant="text"
        sx={{
          color: '#00796b',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#00796b',
            color: '#fff',
          },
        }}
      >
        Лучшее
      </Button>
      <Button
        component={Link}
        to="/admin"
        variant="text"
        sx={{
          color: '#00796b',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#00796b',
            color: '#fff',
          },
        }}
      >
        Admin
      </Button>
    </Box>
  );
}
