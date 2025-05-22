import React, { useEffect, useState } from 'react';
import { getAllEnsembles } from '../api/ensemblesApi';
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
} from '@mui/material';

const PAGE_SIZE = 6;

export default function EnsembleListPage() {
  const [ensembles, setEnsembles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllEnsembles()
      .then((data) => {
        setEnsembles(data);
        setFiltered(data);
      })
      .catch((err) => {
        console.error('Error fetching ensembles:', err);
        setError('Не удалось загрузить ансамбли');
      });
  }, []);

  useEffect(() => {
    const result = ensembles.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [search, ensembles]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!ensembles.length) {
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
          Ансамбли
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            label="Поиск"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Stack>

        <Stack spacing={2}>
          {paginated.map((ensemble) => (
            <Paper key={ensemble.id} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }} elevation={3}>
              <Box
                component={Link}
                to={`/ensembles/${ensemble.id}`}
                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}
              >
                {ensemble.image && (
                  <Box
                    component="img"
                    src={ensemble.image}
                    alt={ensemble.name}
                    sx={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 2 }}
                  />
                )}
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="h6">{ensemble.name}</Typography>
                </Box>
              </Box>
              <Button variant="outlined" component={Link} to={`/ensembles/${ensemble.id}`}>
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
