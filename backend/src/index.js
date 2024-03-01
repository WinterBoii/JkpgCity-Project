// index.js
const db = require('./dbConnection');
const express = require('express');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3001;

// routes
const authenticationRoutes = require('./routes/authentication');
const storesRoutes = require('./routes/stores');
const wellnessRoutes = require('./routes/wellness');

// Allow requests from frontend domain
const corsOptions = {
	origin: 'http://localhost:3000', // Change this to your frontend URL
	credentials: true,
};

// Parse JSON bodies
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/authentication', authenticationRoutes);
app.use('/wellness', wellnessRoutes);
app.use('/stores', storesRoutes);
//const dbURI = process.env.DB_URI;
// const dbSecretKey = process.env.DB_SECRET_KEY;
// const dbUsername = process.env.DB_USERNAME;
// const dbPassword = process.env.DB_PASSWORD;

// database connection
// const dbURI = `mongodb+srv://wajd:admin2024@jkpcity.sktnmlb.mongodb.net/db`;
// console.log(`process.env.DB_PASSWORD ${dbPassword}`)
// mongoose.connect(dbURI)
// //listen on request only after successfull db connection
// .then(async () => {
//   console.log('Connected to MongoDB');
//   // Call insertion functions after successful database connection once
//   // await storesModel.insertStoresFromStoresData(); INSERTED
//   // await wellnessModel.insertWellnessFromWellnessData(); INTENDED

//   app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//   });
// })
// .catch((error) => console.log(`Error connecting to the database "${error})`))

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
app.get('/', (req, res) => {
	res.send('Hello, welcome to the backend!');
});
