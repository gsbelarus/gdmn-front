import 'styles/global.css';

import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import withMuiTheme from '../../components/withMuiTheme';
import { App } from './component';

export default hot(module)(withMuiTheme(connect()(App)));
