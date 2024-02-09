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

  function getTime(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}
  
async function findPath(stationID1, stationID2, trains) {
    
    
    return new Promise((resolve, reject) => {
        const visited = new Set();
        const path = [];
        const allPaths = [];
        
        function dfs(stationID) {
            if (stationID === stationID2) {
                allPaths.push({ path: [...path] });
                return;
            }

            visited.add(stationID);

            for (const train of trains) {
                for (let i = 0; i < train.stops.length - 1; i++) {
                    const currentStop = train.stops[i];
                    const nextStop = train.stops[i + 1];

                    if (currentStop.station_id === stationID && !visited.has(nextStop.station_id)) {
                        path.push({ train_id: train.train_id, currentStop: currentStop, nextStop: nextStop });
                        dfs(nextStop.station_id);
                        path.pop();
                    }
                }
            }

            visited.delete(stationID);
        }

        dfs(stationID1);
        resolve(allPaths);
    });
}

async function curatePaths(paths) {
    let FinalPaths = [];
    if (paths.length === 0) return [];

    for (let p = 0; p < paths.length; p++) {
        let path = paths[p].path;
        let s;
        let STOPINFO = {
            total_cost: 0,
            total_time: 0,
            stations: []
        };
        for (s = 0; s < path.length - 1; s++) {
            if (getTime(path[s].nextStop.arrival_time) > getTime(path[s + 1].currentStop.departure_time)) {
                paths.splice(p, 1);
                p--;
                s = -1;
                break;
            }
            STOPINFO.total_cost += path[s].nextStop.fare;
            STOPINFO.stations.push({
                station_id: path[s].currentStop.station_id,
                train_id: path[s].train_id,
                departure_time: path[s].currentStop.departure_time,
                arrival_time: path[s].currentStop.arrival_time
            });
        }
        if (s != -1) {
            STOPINFO.total_cost += path[s].nextStop.fare;
            STOPINFO.stations.push({
                station_id: path[s].currentStop.station_id,
                train_id: null,
                departure_time: path[s].currentStop.departure_time,
                arrival_time: path[s].currentStop.arrival_time
            });
            STOPINFO.total_time = getTime(path[s - 1].nextStop.arrival_time) - getTime(path[0].currentStop.departure_time);
            FinalPaths.push(STOPINFO);
        }
    }
    return FinalPaths;
}

async function findMinFare(jsonArray) {
    if (!jsonArray || jsonArray.length === 0) {
        return null;
    }

    let minFareJson = jsonArray[0];
    let minFare = minFareJson.total_cost;

    for (let i = 1; i < jsonArray.length; i++) {
        if (jsonArray[i].total_cost < minFare) {
            minFareJson = jsonArray[i];
            minFare = minFareJson.total_cost;
        }
    }

    return minFareJson;
}

async function findMinTime(jsonArray) {
    if (!jsonArray || jsonArray.length === 0) {
        return null;
    }

    let minTimeJson = jsonArray[0];
    let minTime = minTimeJson.total_time;

    for (let i = 1; i < jsonArray.length; i++) {
        if (jsonArray[i].total_time < minTime) {
            minTimeJson = jsonArray[i];
            minTime = minTimeJson.total_time;
        }
    }

    return minTimeJson;
}

async function getOptimizedPath(req, res) {

    const { from, to, optimize } = req.query;
    //res.send(req.query);

    let stationFrom = parseInt(from);
    let stationTo = parseInt(to);

    const trains = await Train.find();
    //res.send(trains);
    //const trains = response.data;

    let Paths = await curatePaths(await findPath(stationFrom, stationTo, trains));
    if (optimize == 'cost') {
        res.json(findMinFare(Paths)) ;
    } else {
        res.json(findMinTime(Paths));
    }
}


module.exports = {
    addTrain,
    getTrain,
    getOptimizedPath

}