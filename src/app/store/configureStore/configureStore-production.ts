import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'store-thunk';

import { IRootState, TRootReducer } from '@src/app/store/rootReducer';

function configureStore(rootReducer: TRootReducer, middlewares?: any, initialState?: IRootState) {
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
