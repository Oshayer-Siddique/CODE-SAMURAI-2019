const express = require('express')

const router = express.Router();

const {addStation, getStation} = require("../controllers/stationController")
router.post('/', addStation);
router.get('/', getStation);




module.exports = router;
