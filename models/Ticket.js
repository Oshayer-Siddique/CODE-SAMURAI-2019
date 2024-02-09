const mongoose = require('mongoose');

// Define the schema for a single station in the ticket
const stationSchema = new mongoose.Schema({
  station_id: { type: Number, required: true },
  train_id: { type: Number, required: true },
  arrival_time: { type: String, required: true },
  departure_time: { type: String, required: true }
});

// Define the schema for the Ticket model
const ticketSchema = new mongoose.Schema({
  ticket_id: { type: Number, required: true, unique: true },
  wallet_id: { type: Number, required: true },
  balance: { type: Number, required: true },
  stations: { type: [stationSchema], required: true }
});

// Create the Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
