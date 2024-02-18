//stores.js
const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {
    try {
        const stores = await db.getAllStores();
        res.status(200).send(stores);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/create', async (req, res) => {
    const {name, url, district} = req.body;

    const result = await db.addStore(name, url, district)
    
    if(result.success) {
        // Store was successfully added
        return res.status(200).send(result.message);
    } else{
        // An error occurred
        return res.status(500).send(err);
    }
});

router.post('/:id/update', async (req, res) => {
    const {name, url, district} = req.body;

    const result = await db.updateStoreById(req.params.id, name, url, district)
    
    if (result.success) {
        // Store was successfully updated
        return res.status(200).send(result.message);
    } else {
        // An error occurred
        return res.status(500).send(result.message); // or result.error if available
    }
});

router.post('/:id/delete', async (req, res) => {
    const id = req.params.id
    const result = await db.delteStoreById(id)

    if(result.success){
        // Store was successfully deleted
        return res.status(200).send(result.message);
    } else {
        // An error occurred
        return res.status(500).send(result.message);
    }
})

module.exports = router;