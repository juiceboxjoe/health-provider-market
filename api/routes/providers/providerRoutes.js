'use strict';

var express = require('express');
var router = express.Router();
var providerControllers = require('./providerControllers')

router.get('/list', providerControllers.list)

module.exports = router;