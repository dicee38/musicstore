import React, { useEffect, useState } from 'react';
import { getAllCompositions } from '../api/compositionsApi';
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

export default function CompositionListPage() {
  const [compositions, setCompositions] = useState([]);

  useEffect(() => {
    getAllCompositions().then(setCompositions);
  }, []);

  if (!compositions.length) {
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
            Произведения
          </Typography>
          <List>
            {compositions.map((comp) => (
              <ListItem key={comp.id} disablePadding>
                <ListItemButton component={Link} to={`/compositions/${comp.id}`}>
                  <ListItemText primary={comp.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
