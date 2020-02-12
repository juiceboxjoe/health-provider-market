'use strict';

var express = require('express');
var router = express.Router();
var userControllers = require('./userControllers')

router.post('/login', userControllers.login)
router.get('/session', userControllers.getSession)
router.get('/logout', userControllers.logout)

module.exports = router;