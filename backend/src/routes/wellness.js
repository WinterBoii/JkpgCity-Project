const {Router} = require('express');
const wellnessController = require('../controller/wellnessController')
const router = Router();
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/wellness', wellnessController.wellnesss_get)

router.post('/create',requireAuth, wellnessController.wellness_post)

router.post('/:id/edit',requireAuth, wellnessController.updateWellnessById)

module.exports = router;