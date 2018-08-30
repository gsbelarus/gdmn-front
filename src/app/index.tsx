import React, { ReactType } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'react-redux';
import socketIo from 'socket.io-client';

import { RouteAccessLevelType } from '@core/components/ProtectedRoute';
import { I18n } from '@core/services/I18n';
import { Auth, UserRoleType } from '@core/services/Auth';
import { WebStorage, WebStorageType } from '@core/services/WebStorage';
import { GdmnApi, IEndpoints } from '@src/app/services/GdmnApi';
import theme from '@src/styles/muiTheme';
import { getStore } from '@src/app/store/store';
import { IState } from '@src/app/store/reducer';
import { ProtectedRouteContainer } from '@src/app/components/ProtectedRouteContainer';
import { IAuthState } from '@src/app/scenes/auth/reducer';
import { getAuthContainer } from '@src/app/scenes/auth/container';
import { RootContainer } from '@src/app/scenes/root/container';
import { getGdmnContainer } from '@src/app/scenes/gdmn/container';

import config from 'config.json';
import { gdmnWsActions } from '@src/app/scenes/gdmn/actions';

// TODO server host/port from window
const clientRootPath = config.server.paths.clientRoot;
const basePath = `${config.server.http.host}:${config.server.http.port}`;
const apiEndpoints: IEndpoints = {
  data: `${basePath}${config.server.paths.api}`,
  signUp: `${basePath}${config.server.paths.signUp}`,
  signIn: `${basePath}${config.server.paths.signIn}`,
  app: `${basePath}${config.server.paths.appRes}`,
  er: `${basePath}${config.server.paths.er}`,
  refreshAccessToken: `${basePath}${config.server.paths.refreshAccessToken}`,
  backup: `${basePath}${config.server.paths.backupRes}`,
  downloadBackup: `${basePath}${config.server.paths.downloadBackup}`,
  restoreBackup: `${basePath}${config.server.paths.restoreBackup}`,
  uploadBackup: `${basePath}${config.server.paths.uploadBackup}`,
  deleteBackup: `${basePath}${config.server.paths.deleteBackup}`,
  ws: basePath
};
const webStorageService = new WebStorage(WebStorageType.local, { namespace: 'gdmn::' });
const authService = new Auth(webStorageService);
const apiService = new GdmnApi(apiEndpoints, authService, config.server.authScheme);
const i18nService = I18n.getInstance();
// todo service
const socket = socketIo(apiService.apiEndpoints.ws, {
  autoConnect: false
    // reconnection: true,
    // reconnectionDelay: 1000,
    // reconnectionDelayMax : 5000,
    // reconnectionAttempts: Infinity,
    // path: ''
  });

const AuthContainer = getAuthContainer(apiService);
const GdmnContainer = getGdmnContainer(apiService);
const NotFoundView = () => <h2>404!</h2>;
const rootRoutes = (
  <Switch>
    <Redirect exact={true} from={'/'} to={`${clientRootPath}/gdmn`} />
    <ProtectedRouteContainer
      path={`${clientRootPath}/gdmn/auth`}
      accessLevel={RouteAccessLevelType.PRIVATE_ANONYM}
      component={AuthContainer}
    />
    <ProtectedRouteContainer
      path={`${clientRootPath}/gdmn`}
      accessLevel={RouteAccessLevelType.PROTECTED_USER}
      component={GdmnContainer}
    />
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
  const authenticated = await authService.isAuthenticated();

  const authInitialState: IAuthState = {
    authenticated,
    // accessToken: authenticated ? await authService.getAccessToken() : undefined,
    userRole: !authenticated ? UserRoleType.ANONYM : UserRoleType.USER // TODO decode from token
  };
  // if (authenticated) {
  //   // TODO extract
  //   const tokenPayload: any = Auth.decodeToken(authInitialState.accessToken!);
  //   authInitialState.accessTokenExpireTime = tokenPayload.exp;
  //   authInitialState.accessTokenIssuedAt = tokenPayload.iat;
  //   authInitialState.userId = tokenPayload.id;
  // }

  store = getStore(authInitialState, authService, socket, apiService);
}

async function wsInit() {
  // todo refresh
  socket.io.opts.query = {
    token: await apiService.getAccessToken()
  };
}

async function start() {
  console.log('[GDMN] start');
  return Promise.all([storeInit(), i18nInit(), wsInit()]);
}

function render(Root: ReactType) {
  const rootComponent = <Root store={store} routes={rootRoutes} theme={theme} />;

  ReactDOM.render(rootComponent, document.getElementById(domContainerNode));
}

(async () => {
  await start();
  render(RootContainer);
})();
