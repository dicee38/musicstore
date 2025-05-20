import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Divider, Button } from '@mui/material';
import EntityList from './EntityList';
import EntityForm from './EntityForm';
import * as api from '../api/adminApi.js';

export default function EntityManager({ entity }) {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const load = () => {
    api.getAll(entity).then(setItems);
  };

  const handleSave = async (data) => {
    if (editingItem) {
      await api.update(entity, editingItem.id, data);
    } else {
      await api.create(entity, data);
    }
    setEditingItem(null);
    load();
  };

  const handleEdit = (item) => setEditingItem(item);

  const handleDelete = async (id) => {
    await api.remove(entity, id);
    load();
  };

  useEffect(() => {
    load();
  }, [entity]);

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Управление: {entity}</Typography>
        <EntityForm
  entity={entity} // 👈 обязательно!
  item={editingItem}
  onSave={handleSave}
  onCancel={() => setEditingItem(null)}
/>
        <Divider sx={{ my: 2 }} />
        <EntityList items={items} onEdit={handleEdit} onDelete={handleDelete} />
      </Paper>
    </Container>
  );
}
