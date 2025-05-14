import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEntities } from '../api/adminApi';
import EntityTable from '../components/EntityTable';
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function EntityManager() {
  const { entity } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntities(entity)
      .then(setData)
      .finally(() => setLoading(false));
  }, [entity]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f4f6f8, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            {entity.toUpperCase()}
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <EntityTable data={data} />
          )}
        </Paper>
      </Container>
    </Box>
  );
}
