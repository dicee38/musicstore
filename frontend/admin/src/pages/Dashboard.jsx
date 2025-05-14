import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f9fafc, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Админ-панель
          </Typography>
          <Box
            component="iframe"
            src="http://localhost:3007/d-solo/sales-dashboard"
            sx={{
              width: '100%',
              height: 500,
              border: 0,
              borderRadius: 2,
              mt: 3,
            }}
            title="Grafana Dashboard"
          />
        </Paper>
      </Container>
    </Box>
  );
}
