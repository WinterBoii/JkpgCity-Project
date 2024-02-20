// index.js
require('dotenv').config()
const express = require('express');
const storeJson = require('./public/stores.json');
const wellnessJson = require('./public/wellness.json');
const app = express();
const db = require('./db');
const port = 3001;

// Parse JSON bodies
app.use(express.json());

// Importing routers for different parts of the application
const storesRouter = require('./routers/stores');
const wellnessRouter = require('./routers/wellness');

app.use('/stores',storesRouter)
app.use('/wellness',wellnessRouter)

app.get('/setup', async (req, res) => {
  try {
    await db.storeSetup(storeJson);
    await db.wellnessSetup(wellnessJson);
    res.status(200).send('Setup complete');
  } catch (err) {
    res.status(500).send(err);
    console.log("err",err);
  }
})

const server = async () => {
db.init()
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}


server()
