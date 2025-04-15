import { createTheme } from '@mui/material/styles';

export const adminTheme = createTheme({
  palette: {
    primary:   { main: '#000', contrastText: '#FFD600' },
    secondary: { main: '#FFD600', contrastText: '#000' },
    background:{ default: '#fff', paper: '#fff' },
    text:      { primary: '#000', secondary: '#FFD600' },
  },
  typography: { fontFamily: 'Montserrat, sans-serif' },
  components: {
    MuiPaper:  { styleOverrides: { root: { borderRadius: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } } },
    MuiTableCell: {
      styleOverrides: {
        head: { backgroundColor: '#000', color: '#FFD600', fontWeight: 700 },
      },
    },
  },
});
