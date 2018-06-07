import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { StyledComponentProps, StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CSSModules from 'react-css-modules';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

const styles = require('./styles.css');

import { ErrorBoundary } from '@src/app/components/ErrorBoundary';
import { ERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { SemanticsBoxContainer } from '@src/app/scenes/semantics/container';

const muiStyles: StyleRulesCallback<'main' | 'navItem' | 'navItemSelected'> = theme => ({
  main: {
    padding: theme.spacing.unit * 4
  },
  navItem: {
    margin: theme.spacing.unit
  },
  navItemSelected: {
    color: theme.palette.secondary.main + ' !important'
  }
});

type IAppProps = RouteComponentProps<any> &
  WithStyles<keyof ReturnType<typeof muiStyles>> &
  CSSModules.InjectedCSSModuleProps;

@CSSModules(styles)
class _App extends React.Component<IAppProps, {}> {
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
        <main styleName={'main'} className={main}>
          <ErrorBoundary>
            <Switch>
              <Route exact={true} path={`${match.path}/`} render={() => <div>Welcome to Home, homie!</div>} />
              <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
              <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
              <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
              <Redirect from={`${match.path}/*`} to={`${match.path}`} />
            </Switch>
          </ErrorBoundary>
        </main>
      </React.Fragment>
    );
  }
}

// TODO switch -> children -> container

const App = withStyles(muiStyles)(_App);

export { App, IAppProps };
