import React, { useEffect, useState } from 'react';
import { getAllCompositions } from '../api/compositionsApi';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Container, Grid, Card, CardContent,
  CardActionArea, TextField, InputAdornment, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CompositionListPage() {
  const [compositions, setCompositions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllCompositions().then((data) => {
      setCompositions(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    setFiltered(
      compositions.filter((c) =>
        c.title.toLowerCase().includes(query) ||
        c.composer?.toLowerCase().includes(query)
      )
    );
  }, [search, compositions]);

  if (!compositions.length) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 8, background: 'linear-gradient(to bottom, #f5f7fa, #ffffff)' }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Произведения
        </Typography>

        <TextField
          fullWidth
          placeholder="Поиск по названию или композитору"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Grid container spacing={3}>
          {filtered.map((comp) => (
            <Grid item xs={12} sm={6} md={4} key={comp.id}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardActionArea component={Link} to={`/compositions/${comp.id}`}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="medium">{comp.title}</Typography>
                    {comp.composer && (
                      <Typography variant="body2" color="text.secondary">
                        Композитор: {comp.composer}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
