const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@core': path.join(__dirname, '../../src/app/core'),
      '@src': path.join(__dirname, '../../src'),
      'config.json': path.join(__dirname, '../config.json')
    }
  }
};
