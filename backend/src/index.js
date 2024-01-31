// index.js
const express = require('express');
const app = express();
const port = 3001;

// Parse JSON bodies
app.use(express.json());

const server = async () => {
  await app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

setInterval(() => {
  console.log("Hello: k8");
}, 1000)

server()
