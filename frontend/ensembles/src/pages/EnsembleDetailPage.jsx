import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEnsembleById } from '../api/ensemblesApi';
import {
  Box, Typography, Container, Paper, Grid, CircularProgress, Divider
} from '@mui/material';

export default function EnsembleDetailPage() {
  const { id } = useParams();
  const [ensemble, setEnsemble] = useState(null);

  useEffect(() => {
    getEnsembleById(id).then(setEnsemble);
  }, [id]);

  if (!ensemble) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 8, background: 'linear-gradient(to bottom, #eef2f7, #ffffff)' }}>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {ensemble.name}
          </Typography>

          {ensemble.image && (
            <Box
              component="img"
              src={ensemble.image}
              alt={ensemble.name}
              sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, my: 3 }}
            />
          )}

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Состав музыкантов
          </Typography>
          <Grid container spacing={2}>
            {ensemble.musicians?.map((m) => (
              <Grid item key={m.id} xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1">{m.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{m.instrument}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>Произведения</Typography>
          <Grid container spacing={2}>
            {ensemble.compositions?.map((c) => (
              <Grid item key={c.id} xs={12} sm={6}>
                <Paper sx={{ p: 2 }} component={Link} to={`/compositions/${c.id}`} style={{ textDecoration: 'none' }}>
                  <Typography variant="body1" fontWeight="bold">{c.title}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

<Typography variant="h6" gutterBottom>Пластинки</Typography>
<Grid container spacing={4}>
  {ensemble.records?.map((r) => (
    <Grid item key={r.id} xs={12} sm={6} md={4}>
      <Link to={`/records/${r.id}`} style={{ textDecoration: 'none' }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': { boxShadow: 6 }
          }}
        >
          {r.image && (
            <Box
              component="img"
              src={r.image}
              alt={r.title}
              sx={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 1,
                mb: 2,
              }}
            />
          )}
          <Typography variant="subtitle1" fontWeight="bold">{r.title}</Typography>
          <Typography variant="body2" color="text.secondary">{r.year}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>{r.price} ₽</Typography>
        </Paper>
      </Link>
    </Grid>
  ))}
</Grid>

        </Paper>
      </Container>
    </Box>
  );
}
