import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext({});
const baseUrl = 'http://localhost:3001';

export const AuthProvider = ({ children }) => {
	const initialAuthState = {
		loggedIn: false,
		isTokenExpired: true,
		user: null,
		tokenExpiration: 0, // Default value (expired)
	};

	const [auth, setAuth] = useState(initialAuthState);

	const login = (user, tokenExpiration) => {
		setAuth({
			...initialAuthState,
			loggedIn: true,
			user,
			tokenExpiration,
		});
	};

	const logout = () => {
		axios
			.post(baseUrl + `/authentication/logout`)
			.then((response) => {
				console.log(response);
				setAuth(initialAuthState);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
