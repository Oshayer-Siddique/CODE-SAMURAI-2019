// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

const bodyParser = require('body-parser');

// Creating an Express application
const port = 8000;
const app = express();

app.use(bodyParser.json());

//for locallly mongodb   mongodb://127.0.0.1:27017/Code_samurai_2024_preli
//const mongourl = "mongodb+srv://oshayersiddique2001:RNiWO88iayIwaFfG@cluster0.c38r7eo.mongodb.net/"
// const mongourl = "mongodb://127.0.0.1:27017/Code_samurai_2024_preli";


// mongoose
//   .connect(mongourl, {
//     //useNewUrlParser: true,
//     //useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });


  mongoose.connect('mongodb://localhost:27017/mydatabase', {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());




// Define a route
app.get('/', (req, res) => {
  res.send("<h2>Hello Mehnaz LLL Oshayer hello Areeb</h2>");
});

//const firstRouter = require('./router/firstrouter');
const userRouter = require("./router/userRouter");
const stationRouter = require("./router/stationRouter");
const walletRouter = require("./router/walletRouter");






//app.use('/',firstRouter);
app.use('/api/users',userRouter);
app.use('/api/wallet',walletRouter);
app.use('/api/stations',stationRouter);






// Start the server on port 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
