import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';

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
      <Button variant="contained" onClick={() => openDialog({})} sx={{ mb: 2 }}>
        Добавить запись
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((h) => (
                <TableCell key={h}>{h}</TableCell>
              ))}
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id || JSON.stringify(row)}>
                {headers.map((h) => (
                  <TableCell key={h}>{row[h]}</TableCell>
                ))}
                <TableCell>
                  <Button size="small" onClick={() => openDialog(row)}>✏️</Button>
                  <Button size="small" color="error" onClick={() => onDelete(row.id)}>🗑️</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editItem?.id ? 'Редактировать' : 'Добавить'} запись</DialogTitle>
        <DialogContent>
          {headers.map((field) => (
            field !== 'id' && (
              <TextField
                key={field}
                margin="dense"
                name={field}
                label={field}
                type="text"
                fullWidth
                value={formState[field] || ''}
                onChange={handleChange}
              />
            )
          ))}
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
