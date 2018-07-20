import React, { ReactType } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'react-redux';

import theme from '@src/styles/muiTheme';
import { getAppContainer } from './scenes/app/container';
import { getStore } from './store/store';
import { I18n } from '@src/app/scenes/web/services/I18n';
import { Auth, UserRoleType } from '@src/app/scenes/web/services/Auth';
import { WebStorage, WebStorageType } from '@src/app/scenes/web/services/WebStorage';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { IAuthState } from '@src/app/scenes/auth/reducer';
import { getAuthContainer } from '@src/app/scenes/auth/container';
import { IRootState } from '@src/app/store/rootReducer';
import { RootContainer } from '@src/app/scenes/root/container';
import { ProtectedRouteContainer, RouteAccessLevelType } from '@src/app/scenes/web/components/ProtectedRoute';

const config = require('configFile'); // FIXME import config from 'configFile';

// TODO server.http.host/port from window

const webStorageService = new WebStorage(WebStorageType.local, { namespace: 'gdmn::' });
const authService = new Auth(webStorageService);
const apiService = new GdmnApi(
  authService,
  config.server.authScheme,
  `${config.server.http.host}:${config.server.http.port}${config.server.paths.api}`,
  `${config.server.http.host}:${config.server.http.port}${config.server.paths.er}`,
  `${config.server.http.host}:${config.server.http.port}${config.server.paths.signIn}`,
  config.server.formFieldNames.signIn.username,
  config.server.formFieldNames.signIn.password
);
const i18nService = I18n.getInstance();

const AuthContainer = getAuthContainer(apiService);
const AppContainer = getAppContainer(apiService);
const NotFoundView = () => <h2>404!</h2>;
const rootRoutes = (
  <Switch>
    <Redirect exact={true} from="/" to="/app" />
    <ProtectedRouteContainer
      accessLevel={RouteAccessLevelType.PRIVATE_ANONYM}
      path="/auth/signIn"
      component={AuthContainer}
    />
    <ProtectedRouteContainer
      accessLevel={RouteAccessLevelType.PROTECTED_USER}
      path="/app"
      component={AppContainer}
    />
    <Route path="*" component={NotFoundView} />
  </Switch>
);

let store: Store<IRootState>;
const domContainerNode = config.webpack.appMountNodeId;

async function i18nInit() {
  try {
    await i18nService.init();
  } catch (e) {
    console.error(`Error loading i18n: ${e}`);
    throw e;
  }
}

async function storeInit() {
  const authInitialState: IAuthState = {
    authenticated: await authService.isAuthenticated(),
    accessToken: await authService.getAccessToken(),
    userRole: !(await authService.isAuthenticated()) ? UserRoleType.ANONYM : UserRoleType.USER // TODO: decodeToken(payload.authToken).userRole
  };

  store = getStore(authInitialState, authService);
}

async function start() {
  console.log('[GDMN] start');
  return Promise.all([storeInit(), i18nInit()]);
}

function render(Root: ReactType) {
  const rootComponent = <Root store={store} routes={rootRoutes} theme={theme} />;

  ReactDOM.render(rootComponent, document.getElementById(domContainerNode));
}

(async () => {
  await start();
  render(RootContainer);
})();
