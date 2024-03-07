import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './lib/utils/Theme';
import routes from './lib/routes';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';

/**
 * App component renders different routes based on react router.
 * It conditionally renders the NavBar component based on
 * the current route.
 * Provides ThemeProvider with custom theme.
 */
function App() {
	const location = useLocation();
	const hideOnRoutes = ['/login', '/*', '/error']; // Add more routes as needed to hide the navbar in

	return (
		<ThemeProvider theme={theme}>
			{!hideOnRoutes.includes(location.pathname) && <NavBar />}
			{!hideOnRoutes.includes(location.pathname) && (
				<div style={{ height: '100px' }} />
			)}
			{''}
			{/* Adjust height as needed */}
			<CssBaseline />
			<Routes>
				{/* {routes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						element={route.element}
					/>
				))} */}
			</Routes>
			{!hideOnRoutes.includes(location.pathname) && <SignUpPage />}
		</ThemeProvider>
	);
}

export default App;
