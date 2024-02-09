const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const USER = require("../models/User");
const Wallet = require("../models/Wallet");

async function adduser(req, res, next) {
    const { user_id, user_name, balance } = req.body;
    const newUser = new USER({
        user_id,
        user_name,
        balance,
    })

    await newUser.save();

    const newWallet = new Wallet({
        wallet_id: user_id,
        wallet_balance: balance,
        wallet_user: {
            user_id: user_id,
            user_name: user_name
        }
    });

    await newWallet.save();

    // Respond with the specific structure
    const response = {
        user_id: newUser.user_id,
        user_name: newUser.user_name,
        balance: newUser.balance,
    };
    res.status(201).json(response);

}



module.exports = {
    adduser,
}