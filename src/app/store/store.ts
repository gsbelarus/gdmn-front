import { configureStore } from './configureStore';
import getRootReducer from './rootReducer';
import { getMiddlewares } from './middlewares';
import { IAuthState } from '@src/app/scenes/auth/reducer';
import { Auth } from '@src/app/scenes/web/services/Auth';

const getStore = (authInitialState: IAuthState, authStore: Auth) =>
  configureStore(getRootReducer(authInitialState), getMiddlewares(authStore));

export { getStore };
