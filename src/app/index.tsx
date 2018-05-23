import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

import configureStore from './configureStore';
import rootReducer from './rootReducer';
import Root from './components/Root';
import App from './screens/app/container';

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

/* FIXME

// webpack HMR with react-hot-loader
if ((module as any).hot) {
  (module as any).hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root');
    render(NextRoot);

    // TODO harmony modules ({modules:false})
    // TODO render(Root);
  });
}

*/
