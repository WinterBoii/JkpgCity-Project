const {Router} = require('express');
const router = Router();
const authController = require('../controller/authController')

router.post('/signup', authController.signup_post)

router.post('/login', authController.login_post)

router.post('/logout', authController.logout_post)

module.exports = router;