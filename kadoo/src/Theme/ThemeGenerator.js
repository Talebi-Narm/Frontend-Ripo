import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00c853",
    },
    secondary: {
      main: "#ffeb3b",
    },
    info: {
      main: "#0091ea",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#ff9800",
    },
    error: {
      main: "#e57373",
      light: "#ef9a9a",
      dark: "#ef5350",
    },
    text: {
      primary: "#005046",
    },
  },
  typography: {
    fontFamily: "Comic Neue",
    fontWeightRegular: 600,
  },
  shape: {
    borderRadius: 14,
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
  transitions: {
    duration: {
      Long: 1000,
    },
  },
});

export default Theme;
