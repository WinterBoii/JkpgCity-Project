const { Router } = require('express');
const wellnessController = require('../controller/wellnessController');
const router = Router();
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/', wellnessController.wellness_get);
router.get('/byCategory', wellnessController.getWellnessByCategory);

// the coming three routes you have to be authenticated to use them (logged in)
router.post('/create', requireAuth, wellnessController.createWellness);

router.post('/:id/edit', requireAuth, wellnessController.updateWellnessById);

router.post('/:id/delete', requireAuth, wellnessController.deleteWellnessById);

module.exports = router;
