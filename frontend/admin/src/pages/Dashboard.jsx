import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:4006/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [
        recordsRes,
        compositionsRes,
        ensemblesRes,
        musiciansRes,
        companiesRes,
      ] = await Promise.all([
        axios.get(`${API}/records`),
        axios.get(`${API}/compositions`),
        axios.get(`${API}/ensembles`),
        axios.get(`${API}/musicians`),
        axios.get(`${API}/companies`),
      ]);

      const totalSales = recordsRes.data.reduce((sum, r) => sum + r.sales, 0);

      setStats({
        records: recordsRes.data.length,
        compositions: compositionsRes.data.length,
        ensembles: ensemblesRes.data.length,
        musicians: musiciansRes.data.length,
        companies: companiesRes.data.length,
        sales: totalSales,
      });
    } catch (err) {
      console.error('Ошибка загрузки статистики:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafc', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Панель статистики
          </Typography>

          {loading ? (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <StatBox label="Всего записей" value={stats.records} />
              <StatBox label="Общие продажи" value={stats.sales} />
              <StatBox label="Произведений" value={stats.compositions} />
              <StatBox label="Ансамблей" value={stats.ensembles} />
              <StatBox label="Музыкантов" value={stats.musicians} />
              <StatBox label="Компаний" value={stats.companies} />
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

function StatBox({ label, value }) {
  return (
    <Grid item xs={12} sm={6}>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          backgroundColor: '#e3f2fd',
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">{label}</Typography>
        <Typography variant="h4" fontWeight="bold" color="primary">
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}
