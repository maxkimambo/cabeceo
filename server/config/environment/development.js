'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {

      uri: 'mongodb://ds011382.mlab.com:11382/cabeceo'
  },
  redis: {
    host: 'localhost',
    port: 6973
  },
  // Seed database on startup
  seedDB: true
};
