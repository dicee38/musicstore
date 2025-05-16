import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper,
} from '@mui/material';

export default function EntityForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Название должно быть не короче 2 символов');
      return;
    }
    setError('');
    onSubmit({ name });
    setName('');
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Создать новую сущность
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="contained">Создать</Button>
      </Box>
    </Paper>
  );
}
