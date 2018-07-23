import { Auth } from '@core/services/Auth';
import { configureStore } from '@src/app/store/configureStore';
import getReducer from '@src/app/store/reducer';
import { getMiddlewares } from '@src/app/store/middlewares';
import { IAuthState } from '@src/app/scenes/auth/reducer';

const getStore = (authInitialState: IAuthState, authStore: Auth) =>
  configureStore(getReducer(authInitialState), getMiddlewares(authStore));

export { getStore };
