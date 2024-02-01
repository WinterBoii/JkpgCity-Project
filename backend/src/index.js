// index.js
require('dotenv').config()
const express = require('express');
import storeJson from './stores.json';
const app = express();
const db = require('./db');
const port = 3001;

// Parse JSON bodies
app.use(express.json());

app.get('/setup', async (req, res) => {
  try {
    await db.setup(storeJson);
    res.status(200).send('Setup complete');
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/', async (req, res) => {
  try {
    const stores = await db.getAllStores();
    res.status(200).send(stores);
  } catch (err) {
    res.status(500).send(err);
  }
})

const server = async () => {
  await db.init();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

setInterval(() => {
  console.log("Hello: k8");
}, 1000)

server()
