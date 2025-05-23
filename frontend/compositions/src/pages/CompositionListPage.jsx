import React, { useEffect, useState } from 'react';
import { getAllCompositions } from '../api/compositionsApi';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  TextField,
  Stack,
  Paper,
  Button,
  Pagination,
  MenuItem,
} from '@mui/material';

const PAGE_SIZE = 6;

export default function CompositionListPage() {
  const [compositions, setCompositions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllCompositions()
      .then((data) => {
        setCompositions(data);
        setFiltered(data);
      })
      .catch((err) => {
        console.error('Error fetching compositions:', err);
        setError('Не удалось загрузить произведения');
      });
  }, []);

  useEffect(() => {
    let updated = [...compositions];

    if (search) {
      const q = search.toLowerCase();
      updated = updated.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.composer?.toLowerCase().includes(q)
      );
    }

    if (sort === 'title') updated.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'composer') updated.sort((a, b) => (a.composer || '').localeCompare(b.composer || ''));

    setFiltered(updated);
    setPage(1);
  }, [search, sort, compositions]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!compositions.length) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f7f9fb, #ffffff)', py: 8 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Произведения
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            label="Поиск"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            label="Сортировка"
            select
            fullWidth
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="">Без сортировки</MenuItem>
            <MenuItem value="title">По названию</MenuItem>
            <MenuItem value="composer">По композитору</MenuItem>
          </TextField>
        </Stack>

        <Stack spacing={2}>
          {paginated.map((comp) => (
            <Paper key={comp.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} elevation={3}>
              <Box
                component={Link}
                to={`/compositions/${comp.id}`}
                sx={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
              >
                <Typography variant="h6">{comp.title}</Typography>
                {comp.composer && (
                  <Typography variant="body2" color="text.secondary">
                    Композитор: {comp.composer}
                  </Typography>
                )}
              </Box>
              <Button variant="outlined" component={Link} to={`/compositions/${comp.id}`}>
                Подробнее
              </Button>
            </Paper>
          ))}
        </Stack>

        {pageCount > 1 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination count={pageCount} page={page} onChange={(e, val) => setPage(val)} color="primary" />
          </Box>
        )}
      </Container>
    </Box>
  );
}
