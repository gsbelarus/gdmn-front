import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import persistState from 'redux-localstorage';

// https://github.com/zalmoxisus/redux-devtools-extension
const devCompose =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const devMiddlewares = [createLogger()];

function configureStore(rootReducer: any, middlewares?: any, initialState?: any | {}) {
  // TODO types

  const store = createStore(
    rootReducer,
    initialState,
    devCompose(applyMiddleware(thunkMiddleware, ...middlewares, ...devMiddlewares))
  );

  // webpack HMR for reducers
  if ((module as any).hot) {
    (module as any).hot.accept('../rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export default configureStore;
