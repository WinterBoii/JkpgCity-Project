const mongoose = require('mongoose');
require('dotenv').config;
// Import your data insertion functions
const { insertWellnessFromWellnessData } = require('./models/Wellness');
const { insertStoresFromStoresData } = require('./models/Store');

const dbURI = `mongodb+srv://wajd:admin2024@jkpcity.sktnmlb.mongodb.net/db`;
const dbConnection = mongoose
	.connect(dbURI)
	.then(async () => {
		console.log('Connected to cloud Atlas');
		/* await insertStoresFromStoresData();
		await insertWellnessFromWellnessData(); */
	})
	.catch((error) => console.log(`Error connecting to the database "${error})`));

module.exports = mongoose.dbConnection;
