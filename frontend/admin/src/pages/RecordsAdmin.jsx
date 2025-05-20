import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Paper, IconButton
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function RecordsAdmin({ onError }) {
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({ title: '', year: '', price: '', stock: '' });

  const fetchRecords = async () => {
    try {
      const res = await axios.get('http://localhost:4006/api/records');
      setRecords(res.data);
    } catch {
      onError('Ошибка загрузки пластинок');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSave = async () => {
    try {
      if (current.id) {
        await axios.put(`http://localhost:4006/api/records/${current.id}`, current);
      } else {
        await axios.post('http://localhost:4006/api/records', current);
      }
      setOpen(false);
      setCurrent({ title: '', year: '', price: '', stock: '' });
      fetchRecords();
    } catch {
      onError('Ошибка при сохранении');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4006/api/records/${id}`);
      fetchRecords();
    } catch {
      onError('Ошибка при удалении');
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => { setCurrent({}); setOpen(true); }}>
        Добавить пластинку
      </Button>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {records.map((r) => (
          <Grid item xs={12} key={r.id}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography>{r.title} ({r.year})</Typography>
                <Typography>Цена: {r.price} ₽, Остаток: {r.stock}</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => { setCurrent(r); setOpen(true); }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(r.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{current.id ? 'Редактировать' : 'Новая пластинка'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Название" value={current.title || ''} onChange={(e) => setCurrent({ ...current, title: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Год" type="number" value={current.year || ''} onChange={(e) => setCurrent({ ...current, year: Number(e.target.value) })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Цена" type="number" value={current.price || ''} onChange={(e) => setCurrent({ ...current, price: Number(e.target.value) })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Остаток" type="number" value={current.stock || ''} onChange={(e) => setCurrent({ ...current, stock: Number(e.target.value) })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleSave} variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
