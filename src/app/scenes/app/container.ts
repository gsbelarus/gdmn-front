import '@src/styles/global.css';

import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { isDevMode } from '@src/app/utils';
import { App } from './component';

const AppContainer = compose(
  hot(module),
  connect()
)(App);

// if (isDevMode()) {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, {exclude: [/^TableCell/, /^Rect/, /^Edge/]});
// }

export { AppContainer };
