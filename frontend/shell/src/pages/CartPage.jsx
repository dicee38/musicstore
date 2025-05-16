import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function CartPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold">Корзина</Typography>
        <Typography sx={{ mt: 2 }}>Ваша корзина пока пуста.</Typography>
      </Paper>
    </Box>
  );
}
