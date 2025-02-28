// Libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
var path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');


// Example: Find all users
User.find({})
  .then(users => console.log(users))
  .catch(err => console.log(err));

const app = express();

// Database connection
require('./database/connection');

// Product Model

// Routes
const router = require('./routes/router');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(""));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use('/api', router);



app.listen(port, function () {
  console.log("Server started at port " + port);
})

// ===== To store data from productsData.js =====
// const defaultData = require('./defaultData');
// defaultData();