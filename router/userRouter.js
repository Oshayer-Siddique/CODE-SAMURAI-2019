const express = require('express')

const router = express.Router();

const {adduser} = require('../controllers/UserController');



router.post('/',adduser);


module.exports = router;