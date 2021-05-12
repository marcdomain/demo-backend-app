const { configure, getLogger } = require('log4js');

configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'app.log' },
  },
  categories: {
    default: {
      appenders: ['app', 'out'],
      level: 'debug'
    }
  }
});

exports.logger = getLogger();
