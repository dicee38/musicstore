  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import {
    Box,
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
    Snackbar,
    CircularProgress,
  } from '@mui/material';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import SaveIcon from '@mui/icons-material/Save';
  import CancelIcon from '@mui/icons-material/Cancel';
  import axios from 'axios';

  const API = 'http://localhost:4006/api';

  export default function EntityManager() {
    const { entity } = useParams();
    const [items, setItems] = useState([]);
    const [newName, setNewName] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadItems();
    }, [entity]);

    const loadItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/${entity}`);
        setItems(res.data);
      } catch (err) {
        setSnackbar('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    const handleCreate = async () => {
      if (newName.trim().length < 2) {
        setError('Минимум 2 символа');
        return;
      }

      try {
        const res = await axios.post(`${API}/${entity}`, { name: newName });
        setItems((prev) => [...prev, res.data]);
        setNewName('');
        setError('');
        setSnackbar('Создано');
      } catch (err) {
        setError('Ошибка при создании');
      }
    };

    const handleDelete = async (id) => {
      await axios.delete(`${API}/${entity}/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSnackbar('Удалено');
    };

    const handleEdit = (item) => {
      setEditId(item.id);
      setEditName(item.name);
    };

    const handleSave = async (id) => {
      if (editName.trim().length < 2) return;

      try {
        const res = await axios.put(`${API}/${entity}/${id}`, { name: editName });
        setItems((prev) =>
          prev.map((item) => (item.id === id ? res.data : item))
        );
        setEditId(null);
        setEditName('');
        setSnackbar('Сохранено');
      } catch {
        setSnackbar('Ошибка при сохранении');
      }
    };

    const handleCancel = () => {
      setEditId(null);
      setEditName('');
    };

    return (
      <Box sx={{ minHeight: '100vh', background: '#f4f6f8', py: 6 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Управление: {entity?.toUpperCase()}
            </Typography>

            {/* Создание */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <TextField
                label="Новое имя"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ flex: 1 }}
              />
              <Button onClick={handleCreate} variant="contained">
                Добавить
              </Button>
            </Box>

            {/* Загрузка / Список */}
            {loading ? (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Paper variant="outlined">
                <List disablePadding>
                  {items.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        secondaryAction={
                          editId === item.id ? (
                            <>
                              <IconButton onClick={() => handleSave(item.id)}>
                                <SaveIcon />
                              </IconButton>
                              <IconButton onClick={handleCancel}>
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton onClick={() => handleEdit(item)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(item.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )
                        }
                      >
                        {editId === item.id ? (
                          <TextField
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            sx={{ width: '70%' }}
                            autoFocus
                          />
                        ) : (
                          <ListItemText primary={item.name} />
                        )}
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            )}

            {/* Уведомления */}
            <Snackbar
              open={!!snackbar}
              autoHideDuration={3000}
              onClose={() => setSnackbar('')}
              message={snackbar}
            />
          </Paper>
        </Container>
      </Box>
    );
  }
