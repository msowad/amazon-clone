import { blueGrey, red, yellow } from "@mui/material/colors";
import { createTheme, PaletteOptions } from "@mui/material/styles";

export const theme = (darkMode: boolean) =>
  createTheme({
    typography: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    },
    palette: darkMode ? darkPalette : lightPalette,
    components: {
      MuiLink: {
        defaultProps: {
          color: "inherit",
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "filled",
          color: darkMode ? "secondary" : "primary",
        },
      },
      MuiCheckbox: {
        defaultProps: {
          color: darkMode ? "secondary" : "primary",
        },
      },
    },
  });

export const lightPalette: PaletteOptions = {
  mode: "light",
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
  background: {
    default: blueGrey[100],
    paper: blueGrey[200],
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    light: blueGrey[50],
    main: blueGrey[100],
    dark: blueGrey[200],
  },
  secondary: {
    light: yellow[400],
    main: yellow[600],
    dark: yellow[800],
  },
  background: {
    default: blueGrey[900],
    paper: blueGrey[800],
  },
  text: {
    primary: "#ffffff",
    secondary: "#ffffff",
    disabled: "#ffffff",
  },
  error: {
    main: red[300],
  },
};
