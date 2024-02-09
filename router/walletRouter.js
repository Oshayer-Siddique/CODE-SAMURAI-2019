const express = require('express');
const { route } = require('./userRouter');

const router = express.Router();


const {getWallet,addMoney} = require('../controllers/walletController');

router.get('/api/wallets/:wallet_id',getWallet);
router.put('/api/wallets/:wallet_id',addMoney);


module.exports = router;
