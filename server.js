// it creates a server node.js "express"
// Initialize the application

// server.js
// Express server to handle form submissions (Task B)

const express = require('express');
const bodyParser = require('body-parser');
const { insertClient } = require('./database');

const app = express();

// allow JSON parsing
app.use(bodyParser.json());

// serve static files (form.html, javascript.js)
app.use(express.static(__dirname));

// POST route to receive form data
app.post('/submit', (req, res) => {
  console.log('Received client data:', req.body); // debug in terminal
  insertClient(req.body);                          // insert into MySQL
  res.sendStatus(200);
});

// start server - important for localhost
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
