import React from 'react';
import {
  List, ListItem, ListItemText,
  IconButton, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EntityList({ items, onEdit, onDelete }) {
  return (
    <List>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => onEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => onDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={item.title || item.name} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
