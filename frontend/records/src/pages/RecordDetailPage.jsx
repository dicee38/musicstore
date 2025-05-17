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
  Divider,
} from '@mui/material';

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
    <Box sx={{ minHeight: '100vh', background: '#f9f9f9', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Картинка слева */}
          <Grid item xs={12} md={5}>
            <Paper elevation={4} sx={{ overflow: 'hidden' }}>
              <Box
                component="img"
                src={`/images/${record.id}.jpg`}
                alt={record.title}
                sx={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }}
              />
            </Paper>
          </Grid>

          {/* Информация справа */}
          <Grid item xs={12} md={7}>
            <Paper elevation={4} sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {record.title}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {record.description || 'Описание отсутствует'}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1">
                <strong>Год выпуска:</strong> {record.year}
              </Typography>

              <Typography variant="body1" sx={{ my: 1 }}>
                <strong>Ансамбль:</strong>{' '}
                {record.ensemble?.name ? (
                  <Link to={`/ensembles/${record.ensemble.id}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
                    {record.ensemble.name}
                  </Link>
                ) : '—'}
              </Typography>

              <Typography variant="body1" sx={{ my: 1 }}>
                <strong>Цена:</strong> {record.price} ₽
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Button variant="contained" color="primary" size="large" onClick={handleAddToCart}>
                В корзину
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
