let config;

switch (process.env.npm_lifecycle_event) {
  case 'start':
    config = require('./config/webpack-develop.config');
    break;
  default:
    config = require('./config/webpack-production.config');
}

export default config;
