const Store = require('../models/Store')

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
        res.status(400).json("error getting store");
    }
}

// method to update store by id from the database
const updateStoreById = async (req, res) =>{
    const {id} = req.params.id;
    const { name, url, district, categories } = req.body;
    try { 
        const store = await Store.findByIdAndUpdate(id, {name, url, district, categories})
        res.status(200).json(store);
        console.log(store) 
        } catch (err) {
            res.status(400).send(`error updating store${err.message}`);
        }
}

// method to delete a store by id from the database
const deleteStoreById = async (req, res) =>{
    const {id} = req.params.id;
    try { 
        const store = await Store.findByIdAndDelete(id)
        res.status(200).json("store deleted seccessfully");
        console.log("store deleted successfully") 
        } catch (err) {
            res.status(400).send(`error deleting store${err.message}`);
        }
}

// method to get stores by categori from the database
const getStoresByCategory = async (req, res) =>{
    //const {category} = req.body
    const data = {
        categories: req.body.categories,
    }
    try { 
        const stores = await Store.find(data)
        res.status(200).json(stores);
        console.log(stores) 
        } catch (err) {
            res.status(400).send(`error getting stores by category${err.message}`);
        }
}

module.exports = {
    store_post,
    stores_get,
    updateStoreById,
    deleteStoreById,
    getStoresByCategory
}