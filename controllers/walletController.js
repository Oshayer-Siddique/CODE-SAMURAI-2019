const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const USER = require("../models/User");
const Wallet = require("../models/Wallet");



async function getWallet(req,res)
{

    try {
      
      const wallet = await Wallet.find();
  
      res.status(200).json(wallet); 
    } catch (error) {
      console.error('Error fetching stations:', error);
      res.status(500).json({ error: 'Failed to fetch stations' });
    }
}

module.exports = {
    getWallet,
}