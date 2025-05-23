import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Container, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4006/api/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Ошибка загрузки статистики:', err));
  }, []);

  if (!stats) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const data = {
    labels: ['Записи', 'Произведения', 'Ансамбли', 'Музыканты', 'Компании'],
    datasets: [
      {
        label: 'Количество',
        backgroundColor: '#1976d2',
        data: [stats.records, stats.compositions, stats.ensembles, stats.musicians, stats.companies]
      }
    ]
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Статистика
        </Typography>
        <Bar data={data} />
        <Typography sx={{ mt: 4 }}>
          Общие продажи: <strong>{stats.sales}</strong> ₽
        </Typography>
      </Paper>
    </Container>
  );
}
