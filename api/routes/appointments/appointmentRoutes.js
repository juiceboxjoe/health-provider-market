'use strict';

var express = require('express');
var router = express.Router();
var appointmentController = require('./appointmentControllers')

router.post('/create', appointmentController.create)

module.exports = router;