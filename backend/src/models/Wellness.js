const wellnessJson = require('../public/wellness.json');
const mongoose = require('mongoose');

// Define a schema for the wellness
const wellnessSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: String,
	rating: Number,
	categories: [String],
});

// Create a mongoose model based on the schema
const Wellness = mongoose.model('wellness', wellnessSchema);


module.exports = Wellness;
