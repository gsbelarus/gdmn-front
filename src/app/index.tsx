import React, { ReactType } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'react-redux';

import { RouteAccessLevelType } from '@core/components/ProtectedRoute';
import { I18n } from '@core/services/I18n';
import { Auth, UserRoleType } from '@core/services/Auth';
import { WebStorage, WebStorageType } from '@core/services/WebStorage';
import { GdmnApi, IEndpoints } from '@src/app/services/GdmnApi';
import theme from '@src/styles/muiTheme';
import { getStore } from '@src/app/store/store';
import { IState } from '@src/app/store/reducer';
import { ProtectedRouteContainer } from '@src/app/components/ProtectedRouteContainer';
import { getAppContainer } from '@src/app/scenes/app/container';
import { IAuthState } from '@src/app/scenes/auth/reducer';
import { getAuthContainer } from '@src/app/scenes/auth/container';
import { RootContainer } from '@src/app/scenes/root/container';

const config = require('configFile'); // FIXME import config from 'configFile';

// TODO server.http.host/port from window
const apiEndpoints: IEndpoints = {
  data: `${config.server.http.host}:${config.server.http.port}${config.server.paths.api}`,
  signIn: `${config.server.http.host}:${config.server.http.port}${config.server.paths.signIn}`,
  app: `${config.server.http.host}:${config.server.http.port}${config.server.paths.appRes}`,
  er: `${config.server.http.host}:${config.server.http.port}${config.server.paths.er}`
};
const webStorageService = new WebStorage(WebStorageType.local, { namespace: 'gdmn::' });
const authService = new Auth(webStorageService);
const apiService = new GdmnApi(
  apiEndpoints,
  authService,
  config.server.authScheme
);
const i18nService = I18n.getInstance();

const AuthContainer = getAuthContainer(apiService);
const AppContainer = getAppContainer(apiService);
const NotFoundView = () => <h2>404!</h2>;
const rootRoutes = (
  <Switch>
    <Redirect exact={true} from="/" to="/app" />
    <ProtectedRouteContainer
      path="/auth/signIn"
      accessLevel={RouteAccessLevelType.PRIVATE_ANONYM}
      component={AuthContainer}
    />
    <ProtectedRouteContainer path="/app" accessLevel={RouteAccessLevelType.PROTECTED_USER} component={AppContainer} />
    <Route path="*" component={NotFoundView} />
  </Switch>
);

let store: Store<IState>;
const domContainerNode = config.webpack.appMountNodeId;

async function loadLocales(url: string, options: any, cb: Function, data: any) {
  try {
    const locale = await import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
    `../locales/${url}`);

    cb(locale, { status: '200' });
  } catch (e) {
    cb(null, { status: '404' });
  }
}

async function i18nInit() {
  try {
    await i18nService.init(loadLocales, 'gdmn');
  } catch (e) {
    console.error(`Error loading i18n: ${e}`);
    throw e;
  }
}

async function storeInit() {
  const authInitialState: IAuthState = {
    authenticated: await authService.isAuthenticated(),
    accessToken: await authService.getAccessToken(),
    userRole: !(await authService.isAuthenticated()) ? UserRoleType.ANONYM : UserRoleType.USER // TODO decode from token
  };

  // TODO extract
  const tokenPayload: any = Auth.decodeToken(authInitialState.accessToken!);
  authInitialState.accessTokenExpireTime = tokenPayload.exp;
  authInitialState.accessTokenIssuedAt = tokenPayload.iat;
  authInitialState.userId = tokenPayload.id;

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
