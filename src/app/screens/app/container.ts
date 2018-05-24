import 'styles/global.css';

import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import withMuiTheme from '../../components/withMuiTheme';
import { App } from './component';

export default hot(module)(withMuiTheme(connect()(App)));
