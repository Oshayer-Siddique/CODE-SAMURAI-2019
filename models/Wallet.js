const mongoose = require('mongoose');

const USER = require("../models/User");

const walletSchema = new mongoose.Schema({
  wallet_id: {
    type: Number,
    required: true,


  },
  wallet_balance: {
    type : Number,


  },
  wallet_user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'USER', 
    required: true 
  },

  
});


const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;