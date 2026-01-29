import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      main: string;
      light: string;
    };
    textCustom: {
      primary: string;
      secondary: string;
      muted: string;
    };
    surface: {
      main: string;
      light: string;
      paper: string;
    };
  }
  interface PaletteOptions {
    border?: {
      main?: string;
      light?: string;
    };
    textCustom?: {
      primary?: string;
      secondary?: string;
      muted?: string;
    };
    surface?: {
      main?: string;
      light?: string;
      paper?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      dark: '#2563eb',
    },
    secondary: {
      main: '#10B981',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: '#f1f5f9',
      paper: '#ffffff',
    },
    border: {
      main: '#e2e8f0',
      light: '#cbd5e1',
    },
    textCustom: {
      primary: '#1e293b',
      secondary: '#64748b',
      muted: '#94a3b8',
    },
    surface: {
      main: '#f8fafc',
      light: '#f1f5f9',
      paper: '#ffffff',
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
