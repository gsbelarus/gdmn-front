import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Root } from './components/Root';
import App from './scenes/app/container';
import store from './store/store';

const config = require('configFile'); // FIXME import config from 'configFile';

const domContainerNode = config.webpack.appMountNodeId;

const NotFoundView = () => <h2>404!</h2>;
const rootRoutes = (
  <Switch>
    <Redirect exact={true} from="/" to="/app" />
    <Route path="/app" component={App} />
    <Route path="*" component={NotFoundView} />
  </Switch>
);

function render(RootComponent: any) {
  const rootComponent = <RootComponent store={store} routes={rootRoutes} />;

  ReactDOM.render(rootComponent, document.getElementById(domContainerNode));
}

render(Root);
