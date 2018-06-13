import React, { Component, Fragment } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { StyleRulesCallback } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CSSModules from 'react-css-modules';

import { IWithStyles, withStyles } from '@src/app/components/withStyles';
import { ErrorBoundary } from '@src/app/components/ErrorBoundary';
import { ERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { SemanticsBoxContainer } from '@src/app/scenes/semantics/container';

const styles = require('./styles.css');

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
  IWithStyles<keyof ReturnType<typeof muiStyles>> &
  CSSModules.InjectedCSSModuleProps;

@withStyles(muiStyles)
@CSSModules(styles)
class App extends Component<IAppProps, {}> {
  public render() {
    const { match, classes } = this.props; // FIXME
    const { main, navItem, navItemSelected } = classes!;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

// TODO switch -> children -> container

export { App, IAppProps };
