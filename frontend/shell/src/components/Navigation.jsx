import React, { useState } from 'react';
import { Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/index';

export default function Navigation() {
  const { isAuth, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const links = [
    { to: '/', label: 'Главная' },
    !isAuth && { to: '/auth', label: 'Авторизация' },
    { to: '/records', label: 'Каталог пластинок' },
    { to: '/ensembles', label: 'Ансамбли' },
    { to: '/compositions', label: 'Композиции' },
    { to: '/top', label: 'Лучшее' },
    isAuth && { to: '/profile', label: 'Профиль' },
    isAuth && { to: '/cart', label: 'Корзина' },
    isAuth && role?.toLowerCase() === 'admin' && { to: '/admin', label: 'Admin' },
  ].filter(Boolean);

  return isMobile ? (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ color: '#00796b' }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          {links.map(({ to, label }) => (
            <ListItem button key={to} component={Link} to={to} onClick={() => setOpen(false)}>
              <ListItemText primary={label} />
            </ListItem>
          ))}
          {isAuth && (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Выйти" sx={{ color: '#d32f2f' }} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        backgroundColor: '#f4f6f8',
        padding: '1rem 0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        flexWrap: 'wrap',
      }}
    >
      {links.map(({ to, label }) => (
        <NavLink key={to} to={to} label={label} />
      ))}
      {isAuth && (
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
