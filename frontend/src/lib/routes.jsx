import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import StoresPage from '../pages/StoresPage';
import WellnessPage from '../pages/WellnessPage';
import ErrorPage from '../pages/ErrorPage';
import CreateStorePage from '../pages/CreateStorePage';
import CreateWellnessPage from '../pages/CreateWellnessPage';

/**
 * Defines the routes for the application.
 *
 * The routes array contains objects with the path, element
 * (React component to render for that route), and exact flag.
 *
 * The routes are ordered from most specific to least specific.
 */
const routes = [
	{
		path: '/stores/edit',
		element: <CreateStorePage />,
		exact: false,
	},
	{
		path: '/wellness/edit',
		element: <CreateWellnessPage wellnessData />,
		exact: false,
	},
	{
		path: '/stores/create',
		element: <CreateStorePage />,
		exact: false,
	},
	{
		path: '/wellness/create',
		element: <CreateWellnessPage />,
		exact: false,
	},
	{
		path: '/stores',
		element: <StoresPage />,
		exact: false,
	},
	{
		path: '/wellness',
		element: <WellnessPage />,
		exact: false,
	},
	{
		path: '/login',
		element: <LoginPage />,
		exact: false,
	},
	{
		path: '/',
		element: <HomePage />,
		exact: true,
	},
	{
		path: '*',
		element: <ErrorPage />,
		exact: false,
	},
];

export default routes;
