const express = require('express')
const router = express.Router()
const db = require('../db')


router.get('/', async (req, res) => {
    try {
        const wellness = await db.getAllWellness();
        res.status(200).send(wellness);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/create', async (req, res) => {
    const {name, url, rating} = req.body;
    const result = await db.addWellness(name, url, rating)
    
    if(result.success) {
        // wellness was successfully added
        return res.status(200).send(result.message);
    } else{
        // An error occurred
        return res.status(500).send(err);
    }
});

router.post('/:id/update', async (req, res) => {
    const {name, url, rating} = req.body;
    const result = await db.updateWellnessById(req.params.id, name, url, rating)
    
    if (result.success) {
        // Wellness was successfully updated
        return res.status(200).send(result.message);
    } else {
        // An error occurred
        return res.status(500).send(result.message); 
    }
});

router.post('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const result = await db.deleteWellnessById(id)
    if(result.success){
        // Wellness was successfully deleted
        return res.status(200).send(result.message);
    } else {
        // An error occurred
        return res.status(500).send(result.message);
    }
})

module.exports = router;