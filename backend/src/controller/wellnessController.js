const Wellness = require('../models/Wellness');

const createWellness = async (req, res) => {
	const data = {
		name: req.body.name,
		url: req.body.url,
		rating: req.body.rating,
		categories: req.body.categories,
	};
	try {
		const wellness = await Wellness.create(data);
		res.status(200).json({ wellness: wellness._id });
	} catch (err) {
		res.status(400).json('Error creating wellness');
	}
};

// method to retrieve all stores in the database
const wellness_get = async (req, res) => {
	try {
		const wellness = await Wellness.find();
		res.status(200).json({ wellness: wellness });
	} catch (err) {
		res.status(400).json('error getting wellness');
	}
};

// method to update wellness by id
const updateWellnessById = async (req, res) => {
	const id = req.params.id;
	const data = {
		name: req.body.name,
		url: req.body.url,
		rating: req.body.rating,
		categories: req.body.categories,
	};
	try {
		const wellness = await Wellness.findByIdAndUpdate(id, data, { new: true });
		res.status(200).json(wellness);
		console.log(wellness);
	} catch (err) {
		res.status(400).json(`error updating wellness ${err.message}`);
	}
};

// method to delete a wellness by id
const deleteWellnessById = async (req, res) => {
	const id = req.params.id;
	try {
		await Wellness.findByIdAndDelete(id);
		res.status(200).json('wellness deleted successfully');
		console.log('wellness deleted successfully');
	} catch (err) {
		res.status(400).json(`error deleting wellness${err.message}`);
	}
};

// method to get wellness by categori from the database
const getWellnessByCategory = async (req, res) => {
	const categories = {
		categories: req.body.categories,
	};

	try {
		const wellness = await Wellness.find(categories);
		res.status(200).json(wellness);
		console.log(wellness);
	} catch (err) {
		res.status(400).json(`error getting wellness by category${err}`);
	}
};

module.exports = {
	createWellness,
	wellness_get,
	updateWellnessById,
	deleteWellnessById,
	getWellnessByCategory,
};
