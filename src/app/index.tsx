import React, { ReactType } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from '@src/styles/muiTheme';
import { Root } from './components/Root';
import { AppContainer } from './scenes/app/container';
import { store } from './store/store';

const config = require('configFile'); // FIXME import config from 'configFile';

const NotFoundView = () => <h2>404!</h2>;
const rootRoutes = (
  <Switch>
    <Redirect exact={true} from="/" to="/app" />
    <Route path="/app" component={AppContainer} />
    <Route path="*" component={NotFoundView} />
  </Switch>
);

const domContainerNode = config.webpack.appMountNodeId;

function render(RootComponent: ReactType) {
  const rootComponent = (
    <MuiThemeProvider theme={theme}>
      <RootComponent store={store} routes={rootRoutes} />
    </MuiThemeProvider>
  );

  ReactDOM.render(rootComponent, document.getElementById(domContainerNode));
}

render(Root);
