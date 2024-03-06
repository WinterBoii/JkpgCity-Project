const Store = require('../models/Store');

const store_post = async (req, res) => {
	const data = {
		name: req.body.name,
		url: req.body.url,
		district: req.body.district,
		categories: req.body.categories,
	};
	try {
		const store = await Store.create(data);
		res.status(200).json({ store: store._id });
	} catch (err) {
		res.status(400).json('Error creating store');
	}
};

const stores_get = async (req, res) => {
	try {
		const stores = await Store.find({}); // Using an empty object to retrieve all stores
		res.status(200).json({ stores: stores });
	} catch (err) {
		console.error('Error fetching stores:', err);
		res.status(500).json({ error: 'An internal server error occurred' });
	}
};

// method to update store by id from the database
const updateStoreById = async (req, res) => {
	const id = req.params.id;
	const data = {
		name: req.body.name,
		url: req.body.url,
		district: req.body.district,
		categories: req.body.categories,
	};
	try {
		const store = await Store.findByIdAndUpdate(id, data, { new: true });
		res.status(200).json(store);
		console.log(store);
	} catch (err) {
		res.status(400).json(`error updating store: ${err.message}`);
	}
};

// method to delete a store by id from the database
const deleteStoreById = async (req, res) => {
	const id = req.params.id;
	try {
		await Store.findByIdAndDelete(id);
		res.status(200).json('store deleted seccessfully');
		console.log('store deleted successfully');
	} catch (err) {
		res.status(400).json(`error deleting store: ${err.message}`);
	}
};

// method to get stores by categori from the database
const getStoresByCategory = async (req, res) => {
	const categories = {
		categories: req.body.categories,
	};
	try {
		const stores = await Store.find(categories);
		res.status(200).json(stores);
		console.log(stores);
	} catch (err) {
		res.status(400).json(`error getting stores by category: ${err.message}`);
	}
};

module.exports = {
	store_post,
	stores_get,
	updateStoreById,
	deleteStoreById,
	getStoresByCategory,
};
