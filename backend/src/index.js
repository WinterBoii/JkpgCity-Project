// index.js
const db = require('./dbConnection')
const express = require('express');
require('dotenv').config()
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const port = 3001;

// routes
const authenticationRoutes = require('./routes/authentication')
const storesRoutes = require('./routes/stores')
const wellnessRoutes = require('./routes/wellness')

// Allow requests from frontend domain
const corsOptions = {
  origin: 'http://localhost:3000', // Change this to your frontend URL
  credentials: true,
};

// Parse JSON bodies
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/authentication',authenticationRoutes)
app.use('/wellness',wellnessRoutes)
app.use('/stores',storesRoutes);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
app.get('/', (req, res) => {
  res.send('Hello, welcome to the backend!');
});