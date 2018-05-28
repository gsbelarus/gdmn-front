const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@src': path.join(__dirname, '..'),
      configFile: path.join(__dirname, '../config/config.json')
    }
  }
};
