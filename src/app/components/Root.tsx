import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

interface RootProps {
  // TODO types
  readonly store: any;
  readonly routes: any;
}

class Root extends React.Component<RootProps, {}> {
  render() {
    const { store, routes } = this.props;
    // TODO const history = browserHistory; // syncHistoryWithStore(browserHistory, store)

    return (
      <Provider store={store}>
        <BrowserRouter>{routes}</BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
