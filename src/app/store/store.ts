import { Auth } from '@core/services/Auth';
import { configureStore } from '@src/app/store/configureStore';
import getRootReducer from '@src/app/store/rootReducer';
import { getMiddlewares } from '@src/app/store/middlewares';
import { IAuthState } from '@src/app/scenes/auth/reducer';

const getStore = (authInitialState: IAuthState, authStore: Auth) =>
  configureStore(getRootReducer(authInitialState), getMiddlewares(authStore));

export { getStore };
