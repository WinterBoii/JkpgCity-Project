const {Router} = require('express');
const router = Router();
const authController = require('../controller/authController')

router.post('/signup', authController.signup_post)

//router.get('/login', authController.login_get)

router.post('/login', authController.login_post)

// router.post('/logout', (req, res) => {
// })

module.exports = router;