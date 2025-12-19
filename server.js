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

// middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// POST route to receive form data
app.post('/submit', (req, res) => {
  console.log('Received client data:', req.body); // debug in terminal
  insertClient(req.body);                       // insert into MySQL
  res.sendStatus(200);
});

// start server - important for localhost
// task C
app.listen(3000, (err) => {
  if (err) {
    console.log('Server failed to start:', err);
  } else {
    console.log('Server running at http://localhost:3000');
  }
});
// for Task D, basic security header called CSP
app.use((req, res, next) => {
res.setHeader(
  "Content-security-policy",
  "default-src 'self' "
);
next();

});
