import Socket = SocketIOClient.Socket;

import { Auth } from '@core/services/Auth';
import { configureStore } from '@src/app/store/configureStore';
import getReducer from '@src/app/store/reducer';
import { getMiddlewares } from '@src/app/store/middlewares';
import { IAuthState } from '@src/app/scenes/auth/reducer';
import { GdmnApi } from '@src/app/services/GdmnApi';

const getStore = (authInitialState: IAuthState, authStore: Auth, socket: Socket, apiService: GdmnApi) => {
  const reducer = getReducer(authInitialState);
  let store = configureStore(reducer, getMiddlewares(authStore, socket, apiService));

  const enhacedReducer = (state: any, action: any) => reducer(action.type === 'SIGN_OUT' ? undefined : state, action);
  store = configureStore(enhacedReducer, getMiddlewares(authStore, socket, apiService));

  return store;
};

export { getStore };
