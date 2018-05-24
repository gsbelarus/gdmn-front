const path = require('path');

module.exports = {
  resolve: {
    alias: {
      configFile: path.join(__dirname, '../config/config.json'),
      styles: path.join(__dirname, '../src/styles'),
      components: path.join(__dirname, '../src/app/components')
    }
  }
};
