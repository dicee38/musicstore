import React from 'react';
import {
  Paper, List, ListItem, ListItemText, Typography,
} from '@mui/material';

export default function EntityList({ items = [] }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Список сущностей
      </Typography>
      <List>
        {items.map((item, i) => (
          <ListItem key={i} divider>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
