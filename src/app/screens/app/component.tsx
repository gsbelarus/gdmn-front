import 'styles/global.css';

import * as React from 'react';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Redirect, NavLink, Route, Switch } from 'react-router-dom';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import MorphBoxContainer from '../../screens/morphology/container';
import SemanticsBoxContainer from '../../screens/semantics/container';
import ERModelContainer from '../../screens/ermodel/container';

const styles: StyleRulesCallback<'main' | 'navItem' | 'navItemSelected'> = theme => ({
  main: {
    textAlign: 'center',
    padding: theme.spacing.unit * 4
  },
  navItem: {
    margin: theme.spacing.unit
  },
  navItemSelected: {
    color: theme.palette.secondary.main + ' !important'
  }
});

export interface AppProps extends WithStyles<'main' | 'navItem' | 'navItemSelected'> {
  // TODO types
  readonly match: any;
}

class _App extends React.Component<AppProps, {}> {
  render() {
    const { match, classes } = this.props;
    const { main, navItem, navItemSelected } = classes;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <NavLink className={navItem} to={`${match.url}/morphology`} activeClassName={navItemSelected}>
              <Button color="inherit" component={'div'}>
                Morphology
              </Button>
            </NavLink>
            <NavLink className={navItem} to={`${match.url}/semantics`} activeClassName={navItemSelected}>
              <Button color="inherit" component={'div'}>
                Semantics
              </Button>
            </NavLink>
            <NavLink className={navItem} to={`${match.url}/ermodel`} activeClassName={navItemSelected}>
              <Button color="inherit" component={'div'}>
                ER-Model
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>
        <main className={main}>
          <ErrorBoundary>
            <Switch>
              <Route exact={true} path={`${match.path}/`} render={() => <div>Welcome to Home, homie!</div>} />
              <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
              <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
              <Route path={`${match.path}/ermodel`} component={ERModelContainer} />
              <Redirect from={`${match.path}/*`} to={`${match.path}`} />
            </Switch>
          </ErrorBoundary>
        </main>
      </React.Fragment>
    );
  }
}

// TODO switch -> children -> container

export const App = withStyles(styles)(_App);
