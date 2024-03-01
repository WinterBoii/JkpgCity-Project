const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id},'3c17ae2c582246af5e3b7a4ef6dd5162fbfe96793dd685cb342b896bc6189a74fa', {
        expiresIn: maxAge
    })
}

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

const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user.email});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
} 

const logout_post = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({message: 'Logged out'});
}

module.exports ={
    signup_post,
    login_post,
    logout_post
}
