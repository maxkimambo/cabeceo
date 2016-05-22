let bunyan = require('bunyan');
let log = bunyan.createLogger({
  name: 'cabeceo',
  streams: [
    {
      level: 'debug',
      stream: process.stderr
    },
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: process.cwd() + '/server/logs/error.log',
    },
    {
      level: 'warn',
      path: process.cwd() + '/server/logs/error.log'
    }

  ]
});



module.exports = log;
