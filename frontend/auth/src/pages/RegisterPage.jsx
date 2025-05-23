import React, { useState } from 'react';
import { registerApi, loginApi } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Paper,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Неверный формат email';

    if (!password) newErrors.password = 'Введите пароль';
    else if (password.length < 6) newErrors.password = 'Минимум 6 символов';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerApi(email, password);
      const userData = await loginApi(email, password);
      if (userData && userData.role) {
        dispatch(login({ role: userData.role }));
        navigate(userData.role === 'admin' ? '/admin' : '/');
      }
    } catch (err) {
      setErrors({ email: 'Ошибка регистрации или входа' });
    }
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
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="filled"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
