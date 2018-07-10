import React, { Component, Fragment } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CSSModules from 'react-css-modules';

import { ErrorBoundary } from '@src/app/components/ErrorBoundary';
import { ERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { SemanticsBoxContainer } from '@src/app/scenes/semantics/container';
// import { WebContainer } from '@src/app/scenes/web/container';
import { Home } from '@src/app/scenes/app/components/Home';

const styles = require('./styles.css');

type IAppProps = RouteComponentProps<any> & CSSModules.InjectedCSSModuleProps;

@CSSModules(styles)
class App extends Component<IAppProps, {}> {
  public render() {
    const { match } = this.props;

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <NavLink styleName="nav-item" to={`${match.url}/morphology`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                Morphology
              </Button>
            </NavLink>
            <NavLink styleName="nav-item" to={`${match.url}/semantics`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                Semantics
              </Button>
            </NavLink>
            <NavLink styleName="nav-item" to={`${match.url}/ermodel`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                ER-Model
              </Button>
            </NavLink>
            <NavLink styleName="nav-item" to={`${match.url}/web`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                Web
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>
        <main styleName="main">
          <ErrorBoundary>
            <Switch>
              <Route exact={true} path={`${match.path}/`} component={Home} />
              <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
              <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
              <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
              {/*<Route path={`${match.path}/web`} component={WebContainer} />*/}
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
