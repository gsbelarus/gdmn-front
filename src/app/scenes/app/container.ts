import '@src/styles/global.css';

import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { App as _App } from './component';

const App = hot(module)(connect()(_App));

export { App };
