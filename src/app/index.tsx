import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';

const config = require('configFile'); // FIXME import config from 'configFile';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(config.webpack.appMountNodeId)
);
