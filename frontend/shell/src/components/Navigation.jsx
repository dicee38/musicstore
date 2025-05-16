import React from 'react';
import { Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/index'; // путь скорректируй

export default function Navigation() {
  const { isAuth, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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
      <NavLink to="/" label="Главная" />
      {!isAuth && <NavLink to="/auth" label="Авторизация" />}
      <NavLink to="/records" label="Каталог пластинок" />
      <NavLink to="/ensembles" label="Ансамбли" />
      <NavLink to="/compositions" label="Композиции" />
      <NavLink to="/top" label="Лучшее" />
      {isAuth && (
        <>
          <NavLink to="/profile" label="Профиль" />
          <NavLink to="/cart" label="Корзина" />
          {role?.toLowerCase() === 'admin' && <NavLink to="/admin" label="Admin" />}
          <Button
            onClick={handleLogout}
            variant="text"
            sx={{
              color: '#d32f2f',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#d32f2f',
                color: '#fff',
              },
            }}
          >
            Выйти
          </Button>
        </>
      )}
    </Box>
  );
}

function NavLink({ to, label }) {
  return (
    <Button
      component={Link}
      to={to}
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
      {label}
    </Button>
  );
}
