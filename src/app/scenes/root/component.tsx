import '@src/styles/global.css';

import React, { ReactNode, ReactType, SFC, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface IRootProps {
  readonly theme: Theme;
  readonly store: Store;
  readonly routes: ReactNode;
  readonly renderSnackbarContainer: ReactType;
}

// TODO const history = browserHistory; // syncHistoryWithStore(browserHistory, store)

const Root: SFC<IRootProps> = ({ store, routes, theme, renderSnackbarContainer }) => (
  <Provider store={store}>
    <Fragment>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {routes}
        </MuiThemeProvider>
      </BrowserRouter>
      {renderSnackbarContainer}
    </Fragment>
  </Provider>
);

export { Root, IRootProps };
