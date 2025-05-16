import React, { useEffect, useState } from 'react';
import { getAllCompositions } from '../api/compositionsApi';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
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
        background: 'linear-gradient(to bottom, #f5f7fa, #ffffff)',
        py: 8,
        animation: `${fadeIn} 0.6s ease forwards`,
        opacity: 0,
      }}
    >
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Произведения
        </Typography>
        <Grid container spacing={3}>
          {compositions.map((comp) => (
            <Grid item xs={12} sm={6} md={4} key={comp.id}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardActionArea component={Link} to={`/compositions/${comp.id}`}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="medium">
                      {comp.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
