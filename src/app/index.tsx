import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Root } from './components/Root';
import configureStore from './configureStore';
import rootReducer from './redux/rootReducer';
import App from './scenes/app/container';

const config = require('configFile'); // FIXME import config from 'configFile';

const store = configureStore(rootReducer, []); // TODO middlewares
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
