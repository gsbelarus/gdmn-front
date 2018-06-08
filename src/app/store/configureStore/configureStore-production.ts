import { applyMiddleware, compose, createStore } from 'redux';

import { IRootState, TRootReducer } from '@src/app/store/rootReducer';

function configureStore(rootReducer: TRootReducer, middlewares?: any, initialState?: IRootState) {
  return createStore(rootReducer, initialState!, compose(applyMiddleware(...middlewares)));
}

export { configureStore };
