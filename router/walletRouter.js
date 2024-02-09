const express = require('express');
const { route } = require('./userRouter');

const router = express.Router();


//const USER = require("../models/User");
const Wallet = require("../models/Wallet");


// Get Wallet Balance Endpoint
router.get('/api/wallets/:wallet_id', async (req, res) => {
    try {
      const walletId = parseInt(req.params.wallet_id);

      res.sendStatus(201);
    //   const wallet = await Wallet.findOne({ wallet_id: walletId }).populate('wallet_user', 'wallet_id balance');
  
    //   if (wallet) {
    //     res,send("Hello");

    //   } else {
    //     res.status(404).json({ message: `wallet with id: ${walletId} was not found` });
    //   }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;
