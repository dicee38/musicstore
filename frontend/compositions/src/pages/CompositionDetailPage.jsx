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
        background: 'linear-gradient(to bottom, #f3f4f6, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {composition.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Композитор:</strong> {composition.composer}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Описание:</strong> {composition.description}
          </Typography>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Связанные пластинки:
          </Typography>
          <List>
            {composition.records.map((r) => (
              <ListItem key={r.id} disableGutters>
                <ListItemText primary={`${r.title} (${r.year})`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
