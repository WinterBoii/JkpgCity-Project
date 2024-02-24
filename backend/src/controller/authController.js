const User = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id},process.env.DB_SECRET_KEY, {
        expiresIn: maxAge
    })
}

const signup_get = async (req, res) => {
    res.send("signup please");
}

const signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({email, password});
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id});
    } catch (err) {
        console.error(err);
        res.status(400).send("error creating user");
    }
}

const login_get = async (req, res) => {
    res.send("login please"); 
}

const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        res.status(200).json({user: user._id});
    } catch (err) {
        res.status(400).json({})
    }
}

// module.exports.logout_get =(req, res) {

// }

// module.exports.logout_post =(req, res) {

// }

module.exports ={
    signup_get,
    signup_post,
    login_get,
    login_post
}