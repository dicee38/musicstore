import React, { useEffect, useState } from 'react';
import { getAllEnsembles } from '../api/ensemblesApi';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function EnsembleListPage() {
  const [ensembles, setEnsembles] = useState([]);

  useEffect(() => {
    getAllEnsembles().then(setEnsembles);
  }, []);

  if (!ensembles.length) {
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
        background: 'linear-gradient(to bottom, #f0f2f5, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Ансамбли
          </Typography>
          <List>
            {ensembles.map((ens) => (
              <ListItem key={ens.id} disablePadding>
                <ListItemButton component={Link} to={`/ensembles/${ens.id}`}>
                  <ListItemText primary={ens.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
