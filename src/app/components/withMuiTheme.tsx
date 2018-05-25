import React from 'react';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

function withMuiTheme(Component: any) {
  // TODO type component

  // FIXME displayName

  function WithMuiTheme(props: object) {
    return (
      <MuiThemeProvider theme={theme}>
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithMuiTheme;
}

export default withMuiTheme;
