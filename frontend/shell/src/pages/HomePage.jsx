import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react'; // для анимации

// 🔧 Ключевая анимация fade-in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🔧 Анимированный Section без react-spring
const Section = ({ children, id, bg = 'white' }) => (
  <Box
    sx={{
      backgroundColor: bg,
      py: 8,
      animation: `${fadeIn} 0.6s ease ${id * 0.3}s forwards`,
      opacity: 0,
    }}
  >
    {children}
  </Box>
);

// 🔧 Визуальный блок для изображения
const renderImageBlock = (src, alt) => (
  <Paper
    sx={{
      height: { xs: 250, sm: 300, md: 400 },
      overflow: 'hidden',
      borderRadius: 3,
      position: 'relative',
    }}
    elevation={4}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </Paper>
);

export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          backgroundImage: 'url("https://cdn.b12.io/client_media/7ohTLClx/6ce8fc2c-2475-11f0-8568-0242ac110002-rrMs7jb_550rmkulq_Wgk.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Мир музыки
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Все для истинных ценителей. Погрузитесь в атмосферу музыкальных шедевров. Альбомы The Beatles и другие культовые записи ждут вас.
          </Typography>
          <Button
            component={Link}
            to="/records"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#ffffff',
              color: '#1976d2',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            Посмотреть товары
          </Button>
        </Box>
      </Box>

      {/* Раздел 2 */}
      <Section id={2}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              {renderImageBlock(
                'https://i.pinimg.com/736x/dd/6e/1d/dd6e1dde18c84db1c917ddd7af1209f8.jpg',
                'Beethoven Symphony'
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Симфонии Бетховена
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Лучшие симфонии в исполнении Берлинского филармонического оркестра.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Раздел 3 */}
      <Section id={3} bg="#f9f9f9">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Альбомы
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Самые популярные релизы, вошедшие в историю. Лучшие альбомы по мнению критиков и слушателей.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              {renderImageBlock(
                'https://i.pinimg.com/736x/eb/72/be/eb72be0906fb2236e1e22221a1579a2b.jpg',
                'Top Albums 2022'
              )}
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Контакты */}
      <Box sx={{ backgroundColor: '#212121', color: 'white', py: 8 }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Свяжитесь с нами
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              mt: 4,
              display: 'grid',
              gap: 3,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            <TextField label="Имя *" variant="filled" fullWidth required />
            <TextField label="Email *" type="email" variant="filled" fullWidth required />
            <TextField label="Телефон *" type="tel" variant="filled" fullWidth required />
            <TextField
              label="Сообщение"
              multiline
              rows={4}
              variant="filled"
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Я разрешаю использовать мои данные для обратной связи"
            />
            <Button variant="contained" size="large" sx={{ alignSelf: 'start' }}>
              Отправить
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
