// src/theme/blackYellowTheme.js
import { createTheme } from '@mui/material/styles';

export const blackYellowTheme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
      contrastText: '#FFD600', // Gold/Yellow
    },
    secondary: {
      main: '#FFD600', // Yellow
      contrastText: '#000000',
    },
    background: {
      default: '#000000', // Background black
      paper: '#111111',   // Paper slightly lighter black
    },
    text: {
      primary: '#FFFFFF', // White text on black
      secondary: '#FFD600',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    button: {
      fontWeight: 'bold',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, 
        },
      },
    },
    
  },
});
