import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';

import { IRootState, RootReducer } from '@src/app/redux/rootReducer';

// https://github.com/zalmoxisus/redux-devtools-extension
const devCompose =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const devMiddlewares = [createLogger()];

function configureStore(rootReducer: RootReducer, middlewares?: any, initialState?: IRootState) {
  const store = createStore(
    rootReducer,
    initialState!,
    devCompose(
      applyMiddleware(
        // thunkMiddleware,
        ...middlewares,
        ...devMiddlewares
      )
    )
  );

  // webpack HMR for reducers
  if ((module as any).hot) {
    (module as any).hot.accept('../redux/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export default configureStore;
