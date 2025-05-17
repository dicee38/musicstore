import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Paper, Typography, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Divider, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart, clearCart, decrementQuantity } from '../store/cartSlice';
import axios from 'axios';

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity || 0), 0);

  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({ fullName: '', phone: '', address: '' });
  const [error, setError] = useState('');

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  axios.get('http://localhost:4001/api/profile', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    const { firstName, lastName, middleName, phone, address } = res.data;
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    setForm({ fullName, phone: phone || '', address: address || '' });
  })
  .catch(() => {});
}, []);


  const handleCheckout = () => setOpenDialog(true);
  const handleClose = () => {
    setOpenDialog(false);
    setError('');
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post('http://localhost:4001/api/orders', {
        items: cart.map((i) => i.id),
        total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch(clearCart());
      setOpenDialog(false);
    } catch (err) {
      setError('Ошибка при оформлении заказа');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold">Корзина</Typography>

        {cart.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Ваша корзина пока пуста.</Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${item.title} x${item.quantity}`}
                      secondary={`Цена за 1: ${item.price} ₽ | Сумма: ${item.price * item.quantity} ₽`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => dispatch(decrementQuantity(item.id))}>−</IconButton>
                      <IconButton onClick={() => dispatch(removeFromCart(item.id))}><DeleteIcon /></IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>Итого: {total} ₽</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleCheckout}>
              Оформить заказ
            </Button>
          </>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Оформление заказа</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="ФИО"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <TextField
            label="Телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <TextField
            label="Адрес доставки"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            multiline
            rows={2}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">Подтвердить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
