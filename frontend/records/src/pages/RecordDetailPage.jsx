import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecordById } from '../api/recordsApi';
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function RecordDetailPage() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecordById(id)
      .then((data) => setRecord(data))
      .catch((err) => setError(`Ошибка при получении данных: ${err.message}`))
      .finally(() => setLoading(false));
  }, [id]);

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
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {record.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Исполнитель:</strong> {record.artist}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Год выпуска:</strong> {record.year}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Ансамбль:</strong> {record.ensemble}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {record.description}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
