const jwt = require('jsonwebtoken')
require('dotenv').config()

//.env is not working for us therefore we have our secret key here for now
const secret = '3c17ae2c582246af5e3b7a4ef6dd5162fbfe96793dd685cb342b896bc6189a74fa';

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    // check if the token exists and is varified
    if(token){
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error){
                console.log(error.message)
                res.status(401).json({error: 'Unauthorized, please log in'})
            } else {
                console.log(decodedToken)
                next()
            }
        })

    } else {
        res.status(401).json({error: 'Unauthorized, please log in'})
    }

}

module.exports = {
    requireAuth
}