import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import rootReducer from './rootReducer';

const config = require('configFile'); // FIXME import config from 'configFile';

const store = configureStore(rootReducer, []); // TODO middlewares

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(config.webpack.appMountNodeId)
);
