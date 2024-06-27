import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0052CC',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#1976d2',
    },
  },
});

export default theme;
