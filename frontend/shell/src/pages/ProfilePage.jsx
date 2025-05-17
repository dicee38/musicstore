import React, { useState, useEffect } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, Grid, Divider, List, ListItem, ListItemText
} from '@mui/material';
import axios from 'axios';

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    address: '',
    email: ''
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token not found in localStorage');
      return;
    }

    axios.get('http://localhost:4001/api/profile/full', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error('PROFILE LOAD ERROR:', err.response?.data || err));

    axios.get('http://localhost:4001/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error('ORDERS LOAD ERROR:', err.response?.data || err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { firstName, lastName, middleName, phone, address } = profile;
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
      await axios.put('http://localhost:4001/api/profile', {
        firstName, lastName, middleName, phone, address
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditMode(false);
    } catch (err) {
      console.error('Profile update error:', err.response?.data || err);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Профиль</Typography>
          <Divider sx={{ mb: 3 }} />

          {editMode ? (
            <Grid container spacing={2}>
              {['lastName', 'firstName', 'middleName', 'phone', 'address'].map((field) => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={
                      field === 'lastName' ? 'Фамилия' :
                      field === 'firstName' ? 'Имя' :
                      field === 'middleName' ? 'Отчество' :
                      field === 'phone' ? 'Телефон' : 'Адрес'
                    }
                    name={field}
                    value={profile[field]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="contained" fullWidth onClick={handleSave}>Сохранить</Button>
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography><strong>Фамилия:</strong> {profile.lastName || '—'}</Typography>
              <Typography><strong>Имя:</strong> {profile.firstName || '—'}</Typography>
              <Typography><strong>Отчество:</strong> {profile.middleName || '—'}</Typography>
              <Typography><strong>Телефон:</strong> {profile.phone || '—'}</Typography>
              <Typography><strong>Адрес:</strong> {profile.address || '—'}</Typography>
              <Typography><strong>Email:</strong> {profile.email || '—'}</Typography>
              <Button sx={{ mt: 3 }} variant="outlined" fullWidth onClick={() => setEditMode(true)}>
                Редактировать
              </Button>
            </>
          )}
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Активные заказы</Typography>
          {orders.length === 0 ? (
            <Typography color="text.secondary">У вас нет заказов.</Typography>
          ) : (
            <List>
              {orders.map((order) => (
                <ListItem key={order.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemText
                    primary={`Заказ #${order.id} — ${order.total} ₽`}
                    secondary={new Date(order.createdAt).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
