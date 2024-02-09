const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const USER = require("../models/User");

async function adduser(req,res,next){
    const{user_id,user_name,balance} = req.body;
    const newUser = new USER({
        user_id,
        user_name,
        balance,
    })

    await newUser.save();
    res.send(req.body);
}



module.exports = {
    adduser,
}