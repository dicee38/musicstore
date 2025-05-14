import React, { useEffect, useState } from 'react';
import { getTopSales } from '../api/topApi';
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

export default function TopSalesPage() {
  const [top, setTop] = useState([]);

  useEffect(() => {
    getTopSales().then(setTop);
  }, []);

  if (!top.length) {
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
        background: 'linear-gradient(to bottom, #f4f6f8, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Лидеры продаж – {new Date().getFullYear()}
          </Typography>
          <List>
            {top.map((item, i) => (
              <ListItem key={item.id} disableGutters>
                <ListItemText primary={`${i + 1}. ${item.title} — ${item.sales} продаж`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
