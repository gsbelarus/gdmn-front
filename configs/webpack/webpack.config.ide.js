const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@core': path.join(__dirname, '../../src/app/core'),
      '@src': path.join(__dirname, '../../src'),
      configFile: path.join(__dirname, '../config.json')
    }
  }
};
