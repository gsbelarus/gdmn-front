import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';

import { IRootState, TRootReducer } from '@src/app/store/rootReducer';

// https://github.com/zalmoxisus/redux-devtools-extension
const devCompose =
  typeof window === 'object' && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const devMiddlewares: Middleware[] = [
  createLogger()
];

function configureStore(rootReducer: TRootReducer, middlewares: Middleware[] = [], initialState?: IRootState) {
  const store = createStore(rootReducer, initialState!, devCompose(applyMiddleware(...middlewares, ...devMiddlewares)));

  // webpack HMR for reducers
  if ((<any>module).hot) {
    (<any>module).hot.accept('../rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export { configureStore };
