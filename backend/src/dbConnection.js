require('dotenv').config();
const mongoose = require('mongoose');
const insertData = require('./inserData');
// Import your data insertion functions

const dbURI = `mongodb+srv://wajd:admin2024@jkpcity.sktnmlb.mongodb.net/db`;
const dbConnection = mongoose
	.connect(dbURI)
	.then(async () => {
		console.log('Connected to cloud Atlas');
		// await insertData.insertStoresFromStoresData()
		// insertData.insertWellnessFromWellnessData()
	})
	.catch((error) => console.log(`Error connecting to the database "${error})`));

module.exports = mongoose.dbConnection;
