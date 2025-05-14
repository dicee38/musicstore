import React, { useEffect, useState } from 'react';
import { getAllRecords } from '../api/recordsApi';
import RecordCard from '../components/RecordCard';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function RecordListPage() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getAllRecords();
        setRecords(data);
      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Не удалось загрузить записи');
      }
    };

    fetchRecords();
  }, []);

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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f7f9fb, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Каталог пластинок
        </Typography>
        <Grid container spacing={4}>
          {records.map((record) => (
            <Grid item key={record.id} xs={12} sm={6} md={4}>
              <Link to={`/records/${record.id}`} style={{ textDecoration: 'none' }}>
                <RecordCard record={record} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
