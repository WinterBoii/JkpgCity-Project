const { Router } = require('express');
const storeController = require('../controller/storeController');
const { requireAuth } = require('../middlewares/authMiddleware');
const router = Router();

router.get('/', storeController.stores_get);

router.get('/byCategory', storeController.getStoresByCategory);

// the coming three routes you have to be authenticated to use them (logged in)
router.post('/create', requireAuth, storeController.store_post);

router.post('/id:/delete', requireAuth, storeController.store_post);

router.post('/:id/edit', requireAuth, storeController.updateStoreById);

module.exports = router;
