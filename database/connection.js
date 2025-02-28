// Libraries
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

// Database Connection
mongoose.connect(DB_URL, function (error) {
  if (error) {
    console.log("NOTE THIS IS AN ERROR ###############")
    console.log(error);
  } else {
    console.log("Database Connected Successfully");
  }
})