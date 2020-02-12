'use strict';

let express = require('express');
let logger = require('morgan');
let Promises = require('./utils/promises')
let utils = require('./utils/misc')

let mongoose = require('mongoose');
let Provider = require('./models/providerSchema');
let Appointment = require('./models/appointmentSchema');

mongoose.Promise = global.Promise;
//TODO wrap connection code with catch and handle error
mongoose.connect('mongodb://localhost/HEALTH_PROVIDER_MARKET_DB', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let userRoutes = require('./routes/users/userRoutes')
let appointmentRoutes = require('./routes/appointments/appointmentRoutes')
let providerRoutes = require('./routes/providers/providerRoutes')

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/providers', providerRoutes);

// catch 404 and return error promise
app.use(function(req, res, next) {
  return Promises.handleError(req, res, utils.makeError('page not found', Promises.statusCodes.STATUS_404))
});

module.exports = app;