const express = require('express')

const router = express.Router();

const {adduser} = require('../controllers/UserController');

router.post('/api/users',adduser);



module.exports = router;