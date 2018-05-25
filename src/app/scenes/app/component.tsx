import 'styles/global.css';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CSSModules from 'react-css-modules';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

// const styles = require('./styles.css'); // TODO import styles from './styles.css';
import { ErrorBoundary } from 'components/ErrorBoundary';
import ERModelContainer from '../../scenes/ermodel/container';
import MorphBoxContainer from '../../scenes/morphology/container';
import SemanticsBoxContainer from '../../scenes/semantics/container';

const muiStyles: StyleRulesCallback<'main' | 'navItem' | 'navItemSelected'> = theme => ({
  main: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center'
  },
  navItem: {
    margin: theme.spacing.unit
  },
  navItemSelected: {
    color: theme.palette.secondary.main + ' !important'
  }
});

export interface AppProps
  extends WithStyles<'main' | 'navItem' | 'navItemSelected'>,
    CSSModules.InjectedCSSModuleProps {
  // TODO types
  readonly match: any;
}

// @CSSModules(styles) // FIXME prod config extract modules
class _App extends React.Component<AppProps, {}> {
  public render() {
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

export const App = withStyles(muiStyles)(_App);
