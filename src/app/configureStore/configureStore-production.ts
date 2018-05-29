import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';

import { IRootState, RootReducer } from '@src/app/redux/rootReducer';

function configureStore(rootReducer: RootReducer, middlewares?: any, initialState?: IRootState) {
  return createStore(
    rootReducer,
    initialState!,
    compose(
      applyMiddleware(
        // thunkMiddleware,
        ...middlewares
      )
    )
  );
}

export default configureStore;
