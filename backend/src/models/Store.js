const mongoose = require('mongoose');

// Define a schema for the store
const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: String,
	district: String,
	categories: [String],
});

// Create a mongoose model based on the schema
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
