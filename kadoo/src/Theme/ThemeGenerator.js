import { createTheme } from '@mui/material/styles'

const font = "'Comic Neue', sans-serif"

const Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00c853',
    },
    secondary: {
      main: '#ffeb3b',
    },
    info: {
      main: '#0091ea',
    },
    background: {
      default: '#141414',
    },
  },
  typography: {
    fontFamily: font,
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
})

export default Theme
