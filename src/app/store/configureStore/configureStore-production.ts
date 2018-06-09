import { applyMiddleware, compose, createStore, Middleware } from 'redux';

import { IRootState, TRootReducer } from '@src/app/store/rootReducer';

function configureStore(rootReducer: TRootReducer, middlewares: Middleware[] = [], initialState?: IRootState) {
  return createStore(rootReducer, initialState!, compose(applyMiddleware(...middlewares)));
}

export { configureStore };
