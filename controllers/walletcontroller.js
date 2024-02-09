const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const USER = require("../models/User");
const Wallet = require("../models/Wallet");



async function getWallet(req, res) {
    const walletId = parseInt(req.params.wallet_id); // Assuming wallet_id is provided as a route parameter
  
    try {
      const wallet = await Wallet.findOne({ wallet_id: walletId }).populate('wallet_user', 'user_id user_name balance');
  
      if (wallet) {
        const response = {
          wallet_id: wallet.wallet_id,
          wallet_balance:wallet.wallet_balance,
          wallet_user: {
            user_id: wallet.wallet_user.user_id,
            user_name: wallet.wallet_user.user_name,
          },
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: `Wallet with id ${walletId} not found` });
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      res.status(500).json({ error: 'Failed to fetch wallet' });
    }
  }

  async function addMoney(req, res) {
    const walletId = parseInt(req.params.wallet_id); // Assuming wallet_id is provided as a route parameter
    const rechargeAmount = req.body.recharge;
  
    try {
      // Find the wallet
      const wallet = await Wallet.findOne({ wallet_id: walletId }).populate('wallet_user', 'user_id user_name');
  
      if (!wallet) {
        // If wallet not found, respond with 404
        return res.status(404).json({ message: `Wallet with id ${walletId} was not found` });
      }
  
      // Check if recharge amount is within the specified range
      if (rechargeAmount < 100 || rechargeAmount > 10000) {
        // If out of range, respond with 400
        return res.status(400).json({ message: `Invalid amount: ${rechargeAmount}` });
      }
  
      // Update wallet balance
      wallet.wallet_balance += rechargeAmount;
      await wallet.save();
  
      // Respond with the updated wallet information

      //console.log(wallet_balance);
      const response = {
        wallet_id: wallet.wallet_id,
        wallet_balance: wallet.wallet_balance + rechargeAmount,
        wallet_user: {
          user_id: wallet.wallet_user.user_id,
          user_name: wallet.wallet_user.user_name,
        },
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error adding money:', error);
      res.status(500).json({ error: 'Failed to add money to wallet' });
    }
  }

module.exports = {
    getWallet,
    addMoney,
}