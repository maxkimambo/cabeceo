/* jshint node: true */
'use strict';
/*global require, module, __dirname */
let express = require('express');
let mongoose = require('mongoose')
 mongoose.Promise = require('bluebird');
let config = require('./config/environment');
let http = require('http');
let log = require('./components/logger');

// add logger
let bunyan = require('bunyan');


// Connect to MongoDB
log.info(config.mongo);
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    log.error(`MongoDB connection error:  + ${err}`);
    process.exit(-1);
});


// Setup server
var app = express();
var server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
    //log.info('Express server started on %d, in %s mode', config.port, app.get('env'));
});
// Expose app
module.exports = app;
