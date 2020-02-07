'use strict';

var express = require('express');
var logger = require('morgan');
const Promises = require('./controllers/utils/promises')

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//TODO wrap connection code with catch and handle error
mongoose.connect('mongodb://localhost/HEALTH_PROVIDER_MARKET_DB', {
  useCreateIndex: true,
  useNewUrlParser: true
});

var marketEndpoints = require('./routes/healthProviderMarketRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/market', marketEndpoints);

// catch 404 and return error promise
app.use(function(req, res, next) {
  return Promises.handleError(req, res, Promises.makeError('page not found', Promises.statusCodes.STATUS_404))
});

module.exports = app;