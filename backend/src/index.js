// index.js
require('dotenv').config()
const express = require('express');
const adminJson = require('./public/admins.json');
const storeJson = require('./public/stores.json');
const wellnessJson = require('./public/wellness.json');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const authenticationRoutes = require('./routes/authentication')
const port = 3001;

// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(authenticationRoutes)


// database connection
const dbURI = 'mongodb+srv://wajd:admin2024@jkpcity.sktnmlb.mongodb.net/db';
mongoose.connect(dbURI)
//listen on request only after successfull db connection
.then((result) => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})  
.catch((error) => console.error(error));

// Define your route after establishing the database connection
app.get('/', (req, res) => {
  // Your route logic here
  res.send('Hello, world!');
});
