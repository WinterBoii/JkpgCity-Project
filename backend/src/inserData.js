const wellnessJson = require('./public/wellness.json');
const storeJson = require('./public/stores.json');

const Wellness = require('./models/Wellness');
const Store = require('./models/Store');
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
			const newStore = new Store({
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


//Loop through the data in the JSON file and save each wellness to the database
const insertWellnessFromWellnessData = async () => {
	for (wellnessData of wellnessJson) {
		// Check if a wellness with the same name already exists in the database
		const existingWellness = await Wellness.findOne({
			name: wellnessData.name,
		});
		if (existingWellness) {
			//console.log(`Wellness ${wellnessData.name} already exists, skipping...`);
			continue; // Skip creating a new wellness if it already exists
		}
		try {
			// Create a new wellness document using the wellness model
			const newWellness = new Wellness({
				name: wellnessData.name,
				url: wellnessData.url,
				rating: wellnessData.rating,
				categories: wellnessData.categories,
			});
			// Save the wellness document to the database
			await newWellness.save();
			console.log(`wellness ${wellnessData.name} created successfully`);
		} catch (error) {
			console.error(`Error creating wellness ${wellnessData.name}:`, error);
		}
	}
	console.log('All Wellness data inserted successfully');
};

module.exports = {
    insertWellnessFromWellnessData,
    insertStoresFromStoresData,
};


