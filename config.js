process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path      = require('path'),
      configDir = path.join(__dirname, 'config'),
      router    = require(`${configDir}/routes`),
      settings  = require(`${configDir}/settings/${process.env.NODE_ENV}.json`);

export { router, settings }
