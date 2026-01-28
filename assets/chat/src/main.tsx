import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
      dark: '#2563EB',
    },
    secondary: {
      main: '#10B981',
      dark: '#059669',
    },
    background: {
      default: 'linear-gradient(135deg, #F0F9FF 0%, #ECFDF5 100%)',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
