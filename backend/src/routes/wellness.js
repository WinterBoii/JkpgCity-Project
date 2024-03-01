const {Router} = require('express');
const wellnessController = require('../controller/wellnessController')
const router = Router();
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/', wellnessController.wellnesss_get)
router.get('/byCategory', wellnessController.getwellnesssByCategory)

// the comming three routes you have to be authenticated to use them (logged in)
router.post('/create',requireAuth, wellnessController.createWellness)

router.post('/:id/edit',requireAuth, wellnessController.updatewellnessById)

router.post('/:id/delete',requireAuth, wellnessController.deletewellnessById)

module.exports = router;