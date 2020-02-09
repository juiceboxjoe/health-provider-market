'use strict';

var express = require('express');
var logger = require('morgan');
const Promises = require('./utils/promises')

var mongoose = require('mongoose');
var Provider = require('./models/providerSchema');
var Appointment = require('./models/appointmentSchema');

mongoose.Promise = global.Promise;
//TODO wrap connection code with catch and handle error
mongoose.connect('mongodb://localhost/HEALTH_PROVIDER_MARKET_DB', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var marketEndpoints = require('./routes/healthProviderMarketRoutes');
var appointmentRoutes = require('./routes/appointments/appointmentRoutes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/market', marketEndpoints);
app.use('/api/appointments', appointmentRoutes);

// catch 404 and return error promise
app.use(function(req, res, next) {
  return Promises.handleError(req, res, Promises.makeError('page not found', Promises.statusCodes.STATUS_404))
});

module.exports = app;