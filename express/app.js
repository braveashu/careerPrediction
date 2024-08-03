const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // for parsing JSON data
const apiRoutes = require('./api'); // Include your API router

const app = express();

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/career_db', { useNewUrlParser: true });

// Parse JSON data from incoming requests
app.use(bodyParser.json());

// Use your API router
app.use('/api', apiRoutes);

// Start the Express.js server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
