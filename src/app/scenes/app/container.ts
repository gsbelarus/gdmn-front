import '@src/styles/global.css';

import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { App } from './component';

// TODO test compose order
const AppContainer = compose(
  hot(module),
  connect()
)(App);

export { AppContainer };
