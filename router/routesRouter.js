const express = require('express')

const router = express.Router();

const {getOptimizedPath} = require("../controllers/trainController")
router.get('/', getOptimizedPath);
// router.get('/', getStation);
// router.get('/:station_id/trains', getTrainsAtStation);




module.exports = router;
