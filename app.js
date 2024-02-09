// Importing required modules
const express = require('express');

const csv = require('csv-parser');
const fs = require('fs');

const path = require('path');

// Creating an Express application
const app = express();




function readCSVData(filePath, callback) {
  const data = [];

  const stream = fs.createReadStream(filePath)
    .pipe(csv());

  stream.on('data', (row) => {
    // Process each row of data
    data.push(row);
  });

  stream.on('end', () => {
    // This is called when all data has been read
    console.log('CSV file successfully processed.');
    callback(null, data);
  });

  stream.on('error', (error) => {
    // Handle errors during the CSV parsing or file reading process
    console.error('Error reading CSV file:', error.message);
    callback(error, null);
  });
}


// Define a route
app.get('/', (req, res) => {
  res.send("<h2>Hello Mehnaz LLL Oshayer</h2>");
});




app.get('/api/data',(req,res) => {
  const csvfilePath = 'datasets/Roadmap-Dhaka.csv';

  readCSVData(csvfilePath,(error,data) =>{
    if(error){
      res.status(500).send("Server Error");
    }
    else{
      res.json(data);
    }
  })
}
)

// Start the server on port 3000
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
