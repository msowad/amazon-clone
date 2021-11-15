import { blueGrey, red, yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: blueGrey[600],
      main: blueGrey[800],
      dark: blueGrey[900],
    },
    secondary: {
      light: yellow[400],
      main: yellow[600],
      dark: yellow[800],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
