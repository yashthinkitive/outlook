
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


















































// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif', 
//   },
//   palette: {
//     primary: {
//       main: '#1976d2', 
//     },
//     background: {
//       default: '#ffffff', 
//     },
//     text: {
//       primary: '#1976d2', 
//     },
//   },
// });





// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );
