const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const Station = require('../models/Station');
const Train = require("../models/Train");



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


async function getTrainsAtStation(req, res) {
    try {
        const stationId = req.params.station_id;
        //res.send(stationId);    
        // Find the station by station ID

        
        const station = await Station.find({ station_id: stationId })

        //res.send(station);
    
        if (!station) {
            // If the station is not found, return an empty list of trains
            return res.status(200).json({ station_id: stationId, trains: [] });
        }
    
        // Find all trains that have a stop at the given station
        const trains = await Train.find({ 'stops.station_id': stationId });
    
        // Sort the trains
        trains.sort((a, b) => {
            const aDepartureTime = getStopTime(a, stationId, 'departure_time');
            const bDepartureTime = getStopTime(b, stationId, 'departure_time');
            const aArrivalTime = getStopTime(a, stationId, 'arrival_time');
            const bArrivalTime = getStopTime(b, stationId, 'arrival_time');
    
            if (aDepartureTime === null && bDepartureTime !== null) return -1;
            if (aDepartureTime !== null && bDepartureTime === null) return 1;
            if (aDepartureTime !== bDepartureTime) return aDepartureTime.localeCompare(bDepartureTime);
            if (aArrivalTime === null && bArrivalTime !== null) return -1;
            if (aArrivalTime !== null && bArrivalTime === null) return 1;
            if (aArrivalTime !== bArrivalTime) return aArrivalTime.localeCompare(bArrivalTime);
            return a.train_id - b.train_id;
      });
  
      // Extract relevant stop information for each train
      const stationTrains = trains.map(train => {
        const stop = train.stops.find(stop => stop.station_id == stationId);
        return {
          train_id: train.train_id,
          arrival_time: stop.arrival_time,
          departure_time: stop.departure_time
        };
      });
  
      res.status(200).json({ station_id: stationId, trains: stationTrains });
    } catch (error) {
      console.error('Error fetching trains at station:', error);
      res.status(500).json({ error: 'Failed to fetch trains at station' });
    }
  }
  
  // Helper function to get the departure or arrival time of a train at a given station
  function getStopTime(train, stationId, type) {
    const stop = train.stops.find(stop => stop.station_id == stationId);
    return stop ? stop[type] : null;
  }

module.exports = {
    addStation,
    getStation,
    getStopTime,
    getTrainsAtStation
}