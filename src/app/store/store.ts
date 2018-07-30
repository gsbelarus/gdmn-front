import { Auth } from '@core/services/Auth';
import { configureStore } from '@src/app/store/configureStore';
import getReducer from '@src/app/store/reducer';
import { getMiddlewares } from '@src/app/store/middlewares';
import { IAuthState } from '@src/app/scenes/auth/reducer';

const getStore = (authInitialState: IAuthState, authStore: Auth) => {
  const reducer = getReducer(authInitialState);
  let store = configureStore(reducer, getMiddlewares(authStore));

  const enhacedReducer = (state: any, action: any) => reducer(action.type === 'SIGN_OUT' ? undefined : state, action);
  store = configureStore(enhacedReducer, getMiddlewares(authStore));

  return store;
};

export { getStore };
