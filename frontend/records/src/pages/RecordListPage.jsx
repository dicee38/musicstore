import React, { useEffect, useState } from 'react';
import { getAllRecords } from '../api/recordsApi';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Stack,
  Divider,
  Paper,
  Button,
  Pagination,
} from '@mui/material';

const PAGE_SIZE = 6;

export default function RecordListPage() {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllRecords()
      .then((data) => {
        setRecords(data);
        setFiltered(data);
      })
      .catch((err) => {
        console.error('Error fetching records:', err);
        setError('Не удалось загрузить записи');
      });
  }, []);

  useEffect(() => {
    let updated = [...records];

    if (search) {
      updated = updated.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'price') updated.sort((a, b) => a.price - b.price);
    if (sort === 'year') updated.sort((a, b) => a.year - b.year);
    if (sort === 'title') updated.sort((a, b) => a.title.localeCompare(b.title));

    setFiltered(updated);
    setPage(1);
  }, [search, sort, records]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!records.length) {
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
          Каталог пластинок
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
            <MenuItem value="price">По цене</MenuItem>
            <MenuItem value="year">По году</MenuItem>
            <MenuItem value="title">По названию</MenuItem>
          </TextField>
        </Stack>

        <Stack spacing={2}>
          {paginated.map((record) => (
            <Paper key={record.id} sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }} elevation={3}>
              <Box
                component={Link}
                to={`/records/${record.id}`}
                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}
              >
                {record.image && (
                  <Box
                    component="img"
                    src={record.image}
                    alt={record.title}
                    sx={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 2 }}
                  />
                )}
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="h6">{record.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Год: {record.year} • Цена: {record.price} ₽
                  </Typography>
                  {record.ensemble?.name && (
                    <Typography variant="body2" color="text.secondary">
                      Ансамбль: {record.ensemble.name}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Button variant="outlined" component={Link} to={`/records/${record.id}`}>Подробнее</Button>
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
