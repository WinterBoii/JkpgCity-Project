const {Router} = require('express');
const storeController = require('../controller/storeController')
const router = Router();
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/stores', storeController.stores_get)

router.post('/create',requireAuth, storeController.store_post)

module.exports = router;