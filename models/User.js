const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    
  },
  user_name: {
    type: String,
    
  },
  balance: {
    type: Number,
    
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
