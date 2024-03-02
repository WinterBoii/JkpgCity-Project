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
	Wellness,
	insertWellnessFromWellnessData,
};
