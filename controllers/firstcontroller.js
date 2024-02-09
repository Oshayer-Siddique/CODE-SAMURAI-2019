const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

var first_data;


async function postfirst(req,res,next){
    const {name} = req.body;
    first_data = name;
    res.send(first_data);

}

async function getfirst(req,res){
    req.send("Hello Ji");
}



module.exports = {
    postfirst,
    
}