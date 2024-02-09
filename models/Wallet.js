const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  user_name: { type: String, required: true }
});

// Define the schema for the Wallet model
const walletSchema = new mongoose.Schema({
  wallet_id: { type: Number, required: true },
  wallet_balance: { type: Number, required: true },
  wallet_user: { type: userSchema, required: true }
});

// Create the Wallet model
const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;