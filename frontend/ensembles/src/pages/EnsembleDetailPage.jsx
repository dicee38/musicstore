import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEnsembleById } from '../api/ensemblesApi';
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
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function EnsembleDetailPage() {
  const { id } = useParams();
  const [ensemble, setEnsemble] = useState(null);

  useEffect(() => {
    getEnsembleById(id).then(setEnsemble);
  }, [id]);

  if (!ensemble) {
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
        background: 'linear-gradient(to bottom, #eef2f7, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {ensemble.name}
          </Typography>

          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            Состав:
          </Typography>
          <List dense>
            {ensemble.members.map((member, index) => (
              <ListItem key={index} disableGutters>
                <ListItemText primary={`${member.name} — ${member.instrument}`} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>
            Произведения:
          </Typography>
          <List dense>
            {ensemble.compositions.map((c) => (
              <ListItem key={c.id} disableGutters>
                <ListItemText primary={c.title} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>
            Пластинки:
          </Typography>
          <List dense>
            {ensemble.records.map((r) => (
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
