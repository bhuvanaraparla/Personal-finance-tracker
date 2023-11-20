const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { db } = require('./db/db'); // Import the db object, which likely includes the db connection
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
const authRoutes = require('./controllers/user');
app.use(express.json());

// Check the MongoDB connection status
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
readdirSync('./routes').map((route) => {
  const routePath = '/api/v1/'; // Define the route path
  const routeModule = require('./routes/' + route);
  app.use(routePath, routeModule); // Use the route with its specific path
});

const server = () => {
  db(); // Assuming that db is a function exported from './db/db'
  app.listen(PORT, () => {
    console.log('Listening to port:', PORT);
  });
};

server();
