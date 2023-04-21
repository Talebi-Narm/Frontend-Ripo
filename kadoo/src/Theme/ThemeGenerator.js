import { createTheme } from "@mui/material/styles";

const font = "'Comic Neue', sans-serif"

const Theme = createTheme({
  // palette: {
  // type: 'light',
  // primary: {
  //   main: '#009688',
  //   light: '#26a69a',
  //     dark: '#00796b',
  //     contrastText: '#f0f5f4',
  //   },
  //   secondary: {
  //     main: '#ffb300',
  //     light: '#ffca28',
  //     dark: '#ffa000',
  //     contrastText: '#303030',
  //   },
  //   warning: {
  //     main: '#ffa726',
  //     light: '#ffb74d',
  //     dark: '#ff9800',
  //   },
  //   error: {
  //     main: '#e57373',
  //     light: '#ef9a9a',
  //     dark: '#ef5350',
  //   },
  //   text: {
  //     primary: '#005046',
  //   },
  // },
  // typography: {
  //   fontFamily: "Quicksand",
  //   fontWeightLight: 400,
  //   fontWeightRegular: 800,
  //   fontWeightMedium: 500,
  //   fontWeightBold: 800,
  //   h1: {
  //     fontWeight: 800,
  //   },
  //   h2: {
  //     fontWeight: 800,
  //   },
  //   h3: {
  //     fontWeight: 800,
  //   },
  //   h4: {
  //     fontWeight: 800,
  //   },
  //   h5: {
  //     fontWeight: 800,
  //     fontSize: '1.4rem',
  //   },
  //   subtitle1: {
  //     fontWeight: 800,
  //   },
  // },
  // transitions: {
  //   duration: {
  //     Long: 1000,
  //   },
  // },
  palette: {
    mode: "dark",
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
    background: {
      default: '#141414',
    },
  },
  typography: {
    fontFamily: "Comic Neue",
    fontWeightRegular: 600,
  },
  shape: {
    borderRadius: '14px',
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
