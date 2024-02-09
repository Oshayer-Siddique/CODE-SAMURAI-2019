const express = require('express');
const { route } = require('./userRouter');

const router = express.Router();


const User = require("../models/User");
const Wallet = require("../models/Wallet");


// Get Wallet Balance Endpoint
router.get('/api/wallets/:wallet_id', async (req, res) => {
    try {
      const walletId = parseInt(req.params.wallet_id);
      const wallet = await Wallet.findOne({ wallet_id: walletId }).populate('wallet_user', 'wallet_id balance');
  
      if (wallet) {
        res.json({
          wallet_id: wallet.wallet_id,
          balance: wallet.balance,
          wallet_user: {
            user_name: wallet.wallet_user.user_name,
            balance: wallet.wallet_user.balance,
          },
        });
      } else {
        res.status(404).json({ message: `wallet with id: ${walletId} was not found` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router;
