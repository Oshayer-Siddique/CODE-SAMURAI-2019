const express = require('express')

const router = express.Router();


const {postfirst} = require('../controllers/firstcontroller');

router.post('/postfirst',postfirst);



module.exports = router;
