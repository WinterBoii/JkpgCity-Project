const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
	const secretKey = process.env.DB_SECRET_KEY || 'fallback-secret-key';

	return jwt.sign({ id }, secretKey, {
		expiresIn: maxAge,
	});
};
const signup_get = async (req, res) => {
	res.send('signup please');
};

const signup_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
		res.status(200).json({ user: user._id });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: 'Error creating user' });
	}
};

const login_get = async (req, res) => {
	res.send('login please');
};

/* const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        res.status(200).json({user: user._id});
    } catch (err) {
        res.status(400).json({})
    }
} */

const login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Assuming your User.login function returns the user details and you generate a token using createToken
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
		// Send the user's ID and token expiration time to the client
		res
			.status(200)
			.json({ user: user._id, tokenExpiration: Date.now() + maxAge });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: 'Invalid credentials' });
	}
};

// module.exports.logout_get =(req, res) {

// }

// module.exports.logout_post =(req, res) {

// }

module.exports = {
	signup_get,
	signup_post,
	login_get,
	login_post,
};
