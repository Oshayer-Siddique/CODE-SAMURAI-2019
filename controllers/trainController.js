const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const Train = require('../models/Train');


async function getTrain(req,res)
{
    try {
      // Fetch all stations from the database
      const trains = await Train.find();
  
      res.status(200).json(trains); // Send back the list of stations
    } catch (error) {
      console.error('Error fetching stations:', error);
      res.status(500).json({ error: 'Failed to fetch stations' });
    }
}



async function addTrain(req, res) {
    try {
      const { train_id, train_name, capacity, stops } = req.body;

      await Train.create(req.body);
  
      const serviceStart = stops[0].departure_time;
      const serviceEnd = stops[stops.length - 1].arrival_time;
  
      const numStations = stops.length;
      
  
      res.status(201).json({train_id, train_name, capacity, serviceStart, serviceEnd, numStations}); // Send back the saved train object
    } catch (error) {
      console.error('Error adding train:', error);
      res.status(500).json({ error: 'Failed to add train' });
    }
  }




module.exports = {
    addTrain,
    getTrain
}