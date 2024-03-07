const storeJson = require('../public/stores.json');
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

// Loop through the data in the JSON file and save each store to the database
const insertStoresFromStoresData = async () => {
	for (storeData of storeJson) {
		try {
			// Check if a store with the same name already exists in the database
			const existingStore = await Store.findOne({ name: storeData.name });
			if (existingStore) {
				//console.log(`Store ${storeData.name} already exists, skipping...`);
				continue; // Skip creating a new store if it already exists
			}
			// Create a new store document using the Store model
			const newStore = new store({
				name: storeData.name,
				url: storeData.url,
				district: storeData.district,
				categories: storeData.categories,
			});
			// Save the store document to the database
			await newStore.save();
			console.log(`Store ${storeData.name} created successfully`);
		} catch (error) {
			console.error(`Error creating store ${storeData.name}:`, error);
		}
	}
	console.log('All stores data inserted successfully');
};
module.exports = Store;
