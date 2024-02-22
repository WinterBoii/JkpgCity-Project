const User = require('../models/User')

const signup_get = async (req, res) => {
    res.send("signup please");
}

const signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({email, password});
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).send("error creating user");
    }
}

const login_get = async (req, res) => {
    res.send("login please"); 
}

const login_post =(req, res) => {
    res.send("new login");
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