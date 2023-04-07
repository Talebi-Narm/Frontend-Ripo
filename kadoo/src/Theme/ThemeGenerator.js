import { createTheme } from '@mui/material/styles'

const varelaRound = {
  fontFamily: 'Quicksand',
  fontStyle: 'Regular',
  fontDisplay: 'swap',
  src: `
   local('VarelaRound-Regular'),
   url(./../assets/Fonts/VarelaRound-Regular.ttf) format('ttf')
 `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

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
  },
  typography: {
    fontFamily: 'Comic Neue',
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
})

export default Theme
