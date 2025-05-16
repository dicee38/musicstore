import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompositionById } from '../api/compositionsApi';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
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
      <Container maxWidth="md">
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

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Связанные пластинки
          </Typography>
          {composition.records.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Нет связанных пластинок
            </Typography>
          ) : (
            <List>
              {composition.records.map((r) => (
                <ListItem key={r.id} disableGutters>
                  <ListItemText primary={`${r.title} (${r.year})`} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
