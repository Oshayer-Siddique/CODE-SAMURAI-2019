// Importing required modules
const express = require('express');

const csv = require('csv-parser');
const fs = require('fs');

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Creating an Express application
const port = 4000;
const app = express();

//for locallly mongodb   mongodb://127.0.0.1:27017/Code_samurai_2024_preli
const mongourl = "mongodb+srv://oshayersiddique2001:RNiWO88iayIwaFfG@cluster0.c38r7eo.mongodb.net/"


mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));



// Define a route
app.get('/', (req, res) => {
  res.send("<h2>Hello Mehnaz LLL Oshayer hello Areeb</h2>");
});

const firstRouter = require('./router/firstrouter');







//app.use('/',firstRouter);






// Start the server on port 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
