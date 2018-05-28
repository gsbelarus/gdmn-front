import '@src/styles/global.css';

import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import withMuiTheme from '@src/app/components/withMuiTheme';
import { App } from './component';

export default hot(module)(withMuiTheme(connect()(App)));
