const express = require('express')

const router = express.Router();

const {addStation, getStation, getTrainsAtStation} = require("../controllers/stationController")
router.post('/', addStation);
router.get('/', getStation);
router.get('/:station_id/trains', getTrainsAtStation);




module.exports = router;
