import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export default function RecordCard({ record }) {
  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      {record.image && (
        <CardMedia
          component="img"
          height="200"
          image={record.image}
          alt={record.title}
        />
      )}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {record.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {record.year}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {record.price} ₽
        </Typography>
        {record.ensemble && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Ансамбль: {record.ensemble.name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
