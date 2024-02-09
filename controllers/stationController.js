const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const Station = require('../models/Station');



async function getStation(req,res)
{
    try {
      // Fetch all stations from the database
      const stations = await Station.find();
  
      res.status(200).json(stations); // Send back the list of stations
    } catch (error) {
      console.error('Error fetching stations:', error);
      res.status(500).json({ error: 'Failed to fetch stations' });
    }
}


async function addStation(req, res)
{
    try {
        const { station_id, station_name, longitude, latitude } = req.body;
      
        // Create a new station instance
        const newStation = new Station({
            station_id,
            station_name,
            longitude,
            latitude
        });

      
        // Save the station to the database
        const savedStation = await newStation.save();
      
        res.status(201).json(savedStation); // Send back the saved station object
        
    } catch (error) {
        console.error('Error adding station:', error);
        res.status(500).json({ error: 'Failed to add station' });
    }
};

module.exports = {
    addStation,
    getStation
}