const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {
    try {
        const stores = await db.getAllUsers();
        res.status(200).send(stores);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router