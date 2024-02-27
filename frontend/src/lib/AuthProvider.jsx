import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

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
		setAuth(initialAuthState);
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
