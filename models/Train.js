const mongoose = require('mongoose');

// Define the nested schema for each stop
const stopSchema = new mongoose.Schema({
  station_id: {
    type: Number,
    required: true
  },
  arrival_time: String,
  departure_time: String,
  fare: {
    type: Number,
    required: true
  }
});

// Define the main schema for the train
const trainSchema = new mongoose.Schema({
  train_id: {
    type: Number,
    required: true
  },
  train_name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  stops: [stopSchema] // Nested array of stops
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
