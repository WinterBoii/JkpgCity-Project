import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import '@fontsource/fira-sans/700.css';
import '@fontsource/fira-sans/500.css';
import '@fontsource/fira-sans/400.css';
import '@fontsource/fira-sans/300.css';

const beigeBase = '#d5bca2';
const beigeMain = alpha(beigeBase, 0.7);

const secondaryBase = '#c1975f';
const secondaryMain = alpha(secondaryBase, 0.7);

export const theme = createTheme({
	palette: {
		primary: {
			main: beigeBase,
			light: alpha(beigeBase, 0.5),
			dark: alpha(beigeBase, 0.9),
			contrastText:
				getContrastRatio(beigeMain, '#fff') > 1.5 ? '#fff' : '#242424',
		},
		secondary: {
			main: secondaryMain,
			light: alpha(secondaryBase, 0.5),
			dark: alpha(secondaryBase, 0.9),
			contrastText:
				getContrastRatio(secondaryMain, '#fff') > 2.5 ? '#fff' : '#242424',
		},
		third: {
			main: '#fff',
			text: '#7B654F',
			bg: '#FFEED9',
			alt: '#242424',
		},
		alternative: {
			main: '#8FB0B2',
		},
	},
	typography: {
		fontFamily: [
			'"Fira Sans", sans-serif', // Add Fira Sans as a font family
		].join(','),
	},
});
