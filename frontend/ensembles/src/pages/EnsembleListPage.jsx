import React, { useEffect, useState } from 'react';
import { getAllEnsembles } from '../api/ensemblesApi';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Container, Grid, CircularProgress, TextField, Pagination, Paper
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ITEMS_PER_PAGE = 6;

export default function EnsembleListPage() {
  const [ensembles, setEnsembles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllEnsembles().then((data) => {
      setEnsembles(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    const result = ensembles.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [search, ensembles]);

  if (!ensembles.length) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f2f5, #ffffff)', py: 8, animation: `${fadeIn} 0.6s ease forwards`, opacity: 0 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Ансамбли
        </Typography>

        <TextField
          fullWidth
          label="Поиск ансамбля"
          variant="outlined"
          sx={{ mb: 4 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Grid container spacing={4}>
          {paginated.map((ensemble) => (
            <Grid item key={ensemble.id} xs={12} sm={6} md={4}>
              <Link to={`/ensembles/${ensemble.id}`} style={{ textDecoration: 'none' }}>
                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                  {ensemble.image && (
                    <Box
                      component="img"
                      src={ensemble.image}
                      alt={ensemble.name}
                      sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 2 }}
                    />
                  )}
                  <Typography variant="body2" fontWeight="bold" sx={{ mt: 2 }}>
                    {ensemble.name}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>

        {filtered.length > ITEMS_PER_PAGE && (
          <Pagination
            count={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          />
        )}
      </Container>
    </Box>
  );
}
