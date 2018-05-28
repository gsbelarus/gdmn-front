import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';

// import persistState from 'redux-localstorage';

function configureStore(rootReducer: any, middlewares?: any, initialState?: any | {}) {
  // TODO types
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        // thunkMiddleware,
        ...middlewares
      )
    )
  );
}

export default configureStore;
