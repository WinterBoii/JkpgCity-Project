const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuth = (req, res, next) => {
    const token = req.cookie.jwt
    // check if the token exists and is varified
    if(token){
        jwt.verify(token, process.env.DB_SECRET_KEY , (error, decodedToken) => {
            if(error){
                console.log(error.message)
                res.status(401).json({error: 'Unauthorized, please logg in'})
            } else {
                console.log(decodedToken)
                next()
            }
        })

    } else {
        res.status(401).json({error: 'Unauthorized, please logg in'})
    }

}

module.exports = {
    requireAuth
}