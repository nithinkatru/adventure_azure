// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8, 
  palette: {
    primary: {
      main: '#000000', // Black
      contrastText: '#FFD600', // Yellow
    },
    secondary: {
      main: '#FFD600',  // Yellow
      contrastText: '#000000', // Black
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    
  },

});

export default theme;
