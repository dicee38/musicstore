import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRecordById } from '../api/recordsApi';
import { addToCart } from 'shell/store/cartSlice';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function RecordDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecordById(id)
      .then((data) => setRecord(data))
      .catch((err) => setError(`Ошибка при получении данных: ${err.message}`))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: record.id,
      title: record.title,
      price: record.price,
      image: record.image,
    }));
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f2f2f2, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {record.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Год выпуска:</strong> {record.year}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Ансамбль:</strong>{' '}
                {record.ensemble?.name ? (
                  <Link to={`/ensembles/${record.ensemble.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {record.ensemble.name}
                  </Link>
                ) : (
                  '—'
                )}
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, mb: 3 }}>
                {record.description || 'Описание отсутствует'}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Цена: {record.price} ₽
              </Typography>
              <Button variant="contained" size="large" sx={{ mt: 3 }} onClick={handleAddToCart}>
                В корзину
              </Button>
            </Grid>

            <Grid item xs={12} md={4}>
  <Paper
    elevation={3}
    sx={{
      overflow: 'hidden',
      transition: '0.3s',
      '&:hover': { boxShadow: 6 },
    }}
  >
    {record.image ? (
      <Box
        component="img"
        src={record.image}
        alt={record.title}
        sx={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
          display: 'block'
        }}
      />
    ) : (
      <Box
        sx={{
          width: '100%',
          height: 300,
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary">Нет изображения</Typography>
      </Box>
    )}
  </Paper>
</Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
