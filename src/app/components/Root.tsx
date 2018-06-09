import React, { ReactNode, SFC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';

interface IRootProps {
  readonly store: Store;
  readonly routes: ReactNode;
}

// TODO const history = browserHistory; // syncHistoryWithStore(browserHistory, store)

const Root: SFC<IRootProps> = ({ store, routes }) => (
  <Provider store={store}>
    <BrowserRouter>{routes}</BrowserRouter>
  </Provider>
);

export { Root, IRootProps };
