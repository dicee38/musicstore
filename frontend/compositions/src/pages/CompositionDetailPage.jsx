import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompositionById } from '../api/compositionsApi';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Divider,
  Chip,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function CompositionDetailPage() {
  const { id } = useParams();
  const [composition, setComposition] = useState(null);

  useEffect(() => {
    getCompositionById(id).then(setComposition);
  }, [id]);

  if (!composition) {
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
        background: 'linear-gradient(to bottom, #eef1f5, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {composition.title}
          </Typography>

          <Chip
            label={`Композитор: ${composition.composer}`}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Typography variant="body1" paragraph>
            {composition.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
  Связанные пластинки
</Typography>
{composition.records.length === 0 ? (
  <Typography variant="body2" color="text.secondary">
    Нет связанных пластинок
  </Typography>
) : (
  <Grid container spacing={4}>
    {composition.records.map((record) => (
      <Grid item key={record.id} xs={12} sm={6} md={4}>
        <Paper
          component={Link}
          to={`/records/${record.id}`}
          elevation={3}
          sx={{
            textDecoration: 'none',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: '0.3s',
            '&:hover': { boxShadow: 6 },
          }}
        >
          {record.image && (
            <Box
              component="img"
              src={record.image}
              alt={record.title}
              sx={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
          )}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {record.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {record.year}
            </Typography>
            {record.price && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {record.price} ₽
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
)}

        </Paper>
      </Container>
    </Box>
  );
}
