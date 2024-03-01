const Store = require('../models/Store')
const jwt = require('jsonwebtoken')

const store_post = async (req, res) => {
    const { name, url, district, categories } = req.body;
    try {
        const store = await Store.create({ name, url, district, categories });
        res.status(200).json({ store: store._id });
    } catch (err) {
        res.status(400).send("Error creating store");
    }
}

const stores_get = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json({stores: stores});
    } catch (err) {
        res.status(400).send("error getting store");
    }
}

module.exports = {
    store_post,
    stores_get
}