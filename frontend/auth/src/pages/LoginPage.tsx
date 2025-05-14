import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { loginApi } from '../api/authApi';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Paper,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await loginApi(email, password);
    if (userData) {
      dispatch(login(userData));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'url("https://images.unsplash.com/photo-1584897964209-bf93ec61c84b") center/cover no-repeat',
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
          Вход в аккаунт
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
            Войти
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Нет аккаунта? <Link to="/auth/register">Зарегистрироваться</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
