const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const USER = require("../models/User");
const WALLET = require("../models/Wallet");


async function walletinfo(req,res){
    
}