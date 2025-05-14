import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Typography, Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EntityTable({ data, onCreate, onUpdate, onDelete }) {
  const [editItem, setEditItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formState, setFormState] = useState({});

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const openDialog = (item = {}) => {
    setEditItem(item);
    setFormState(item);
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editItem && editItem.id) {
      onUpdate(formState);
    } else {
      onCreate(formState);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => openDialog({})}>
          Добавить
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((h) => (
                <TableCell key={h} sx={{ fontWeight: 'bold' }}>{h}</TableCell>
              ))}
              <TableCell sx={{ fontWeight: 'bold' }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id || JSON.stringify(row)}>
                {headers.map((h) => (
                  <TableCell key={h}>{row[h]}</TableCell>
                ))}
                <TableCell>
                  <Button size="small" onClick={() => openDialog(row)}><EditIcon fontSize="small" /></Button>
                  <Button size="small" color="error" onClick={() => onDelete(row.id)}><DeleteIcon fontSize="small" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editItem?.id ? 'Редактировать запись' : 'Добавить запись'}</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
          {headers.map((field) =>
            field !== 'id' && (
              <TextField
                key={field}
                name={field}
                label={field}
                fullWidth
                value={formState[field] || ''}
                onChange={handleChange}
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
