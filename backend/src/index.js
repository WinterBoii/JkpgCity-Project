// index.js
require('dotenv').config()
const express = require('express');
const storeJson = require('./stores.json');
const app = express();
const db = require('./db');
const port = 4002;

// Parse JSON bodies
app.use(express.json());

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

app.get('/stores', async (req, res) => {
  try {
    const stores = await db.getAllStores();
    res.status(200).send(stores);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/wellness', async (req, res) => {
  try {
    //const wellness = await db.getAllWellness();
    res.status(200).send(wellness);
  } catch (err) {
    res.status(500).send(err);
  }
})

const server = async () => {
db.init()
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

setInterval(() => {
  //console.log("Hello: k8");
}, 1000)

server()
