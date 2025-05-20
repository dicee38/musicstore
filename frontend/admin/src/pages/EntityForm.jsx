import React, { useEffect, useState } from 'react';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { fieldSchemas } from '../config/fieldSchemas';

export default function EntityForm({ entity, item, onSave, onCancel }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(item || {});
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsed = type === 'number' ? Number(value) : value;
    setForm({ ...form, [name]: parsed });
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({});
  };

  const fields = fieldSchemas[entity] || [];

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: item ? '#fffde7' : '#e3f2fd' }}>
      <Typography variant="h6" gutterBottom>
        {item ? 'Редактирование' : 'Добавление'} {entity}
      </Typography>

      <Stack spacing={2}>
        {fields.map(({ name, label, type }) => (
          <TextField
            key={name}
            name={name}
            label={label}
            type={type || 'text'}
            value={form[name] ?? ''}
            onChange={handleChange}
            fullWidth
          />
        ))}

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color={item ? 'warning' : 'primary'}
            onClick={handleSubmit}
          >
            {item ? 'Обновить' : 'Добавить'}
          </Button>
          {item && (
            <Button variant="outlined" onClick={onCancel}>
              Отмена
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
