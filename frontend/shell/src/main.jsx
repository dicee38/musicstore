import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/index';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
