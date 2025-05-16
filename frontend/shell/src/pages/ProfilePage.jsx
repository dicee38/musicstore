import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  // @ts-ignore
  const { role } = useSelector((state) => state.user || {});

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold">Профиль</Typography>
        <Typography sx={{ mt: 2 }}>Ваша роль: <strong>{role}</strong></Typography>
      </Paper>
    </Box>
  );
}
