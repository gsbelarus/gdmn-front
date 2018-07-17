import '@src/styles/global.css';

import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withProps } from 'recompose';

// import { isDevMode } from '@src/app/utils';
import { getERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { getSemanticsBoxContainer } from '@src/app/scenes/semantics/container';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { App } from './component';

const getAppContainer = (apiService: GdmnApi) => compose(
  hot(module),
  connect(),
  withProps({
    renderSemanticsBoxContainer: getSemanticsBoxContainer(apiService),
    renderERModelBoxContainer: getERModelBoxContainer(apiService)
  })
)(App);

// if (isDevMode()) {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, {exclude: [/^TableCell/, /^Rect/, /^Edge/]});
// }

export { getAppContainer };
