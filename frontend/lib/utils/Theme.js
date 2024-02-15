import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const beigeBase = '#d5bca2';
const beigeMain = alpha(beigeBase, 0.7);

const secondaryBase = '#c1975f'
const secondaryMain = alpha(secondaryBase, 0.7);

export const theme = createTheme({
  palette: {
    primary: {
      main: beigeMain,
      light: alpha(beigeBase, 0.5),
      dark: alpha(beigeBase, 0.9),
      contrastText: getContrastRatio(beigeMain, '#fff') > 4.5 ? '#fff' : '#242424',
    },
    secondary: {
      main: secondaryMain,
      light: alpha(secondaryBase, 0.5),
      dark: alpha(secondaryBase, 0.9),
      contrastText: getContrastRatio(secondaryMain, '#fff') > 2.5 ? '#fff' : '#242424',
    },
  }
})
