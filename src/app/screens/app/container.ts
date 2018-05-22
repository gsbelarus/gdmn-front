import 'styles/global.css';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import withMuiTheme from '../../components/withMuiTheme';
import { App } from './component';
import { isDevMode } from '../../utils';

let container = withMuiTheme(connect()(App));
if (isDevMode()) {
  container = hot(module)(container);
}

export default container;
