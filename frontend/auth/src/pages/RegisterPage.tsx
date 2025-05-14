import React, { useState } from 'react';
import { registerApi } from '../api/authApi';
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Paper,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerApi(email, password);
    alert('Вы успешно зарегистрированы!');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'url("https://images.unsplash.com/photo-1611605698325-0e3ce204b5fd") center/cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          animation: `${fadeIn} 0.6s ease forwards`,
          opacity: 0,
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            type="password"
            variant="filled"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Уже есть аккаунт? <Link to="/">Войти</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
