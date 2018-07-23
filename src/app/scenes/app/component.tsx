import React, { Component, Fragment } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import CSSModules from 'react-css-modules';

import { ErrorBoundary } from '@core/components/ErrorBoundary';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { WebContainer } from '@src/app/scenes/web/container';

const styles = require('./styles.css');

interface IAppActionsProps {
  signOut: () => void;
}

interface IAppStateProps {
  readonly errorMessage?: string;
}

interface IAppProps extends RouteComponentProps<any>, IAppActionsProps, IAppStateProps {
  renderHome: React.ComponentType<any>;
  renderSemanticsBoxContainer: React.ComponentType<any>;
  renderERModelBoxContainer: React.ComponentType<any>;
}

@CSSModules(styles)
class App extends Component<IAppProps & CSSModules.InjectedCSSModuleProps, {}> {
  public render() {
    const {
      location,
      match,
      renderHome: Home,
      renderSemanticsBoxContainer: SemanticsBoxContainer,
      renderERModelBoxContainer: ERModelBoxContainer,
      signOut,
      errorMessage // TODO
    } = this.props;

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <NavLink styleName="nav-item" to={`${match.url}/app`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                NLP
              </Button>
            </NavLink>
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
            <NavLink
              styleName="nav-item"
              to={`${match.url}/web`}
              activeClassName="nav-item-selected"
              style={{ flexGrow: 1 }}
            >
              <Button color="inherit" component={'div'}>
                Web
              </Button>
            </NavLink>
            <Button color="inherit" component={'div'} onClick={signOut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main styleName="main" className={location.pathname !== match.path ? 'scene-pad' : ''}>
          <ErrorBoundary>
            <Switch>
              <Route exact={true} path={`${match.path}/`} component={Home} />
              <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
              <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
              <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
              <Route path={`${match.path}/web`} component={WebContainer} />
              <Redirect from={`${match.path}/*`} to={`${match.path}`} />
            </Switch>
          </ErrorBoundary>
        </main>
      </Fragment>
    );
  }
}

// TODO switch -> children -> container

export { App, IAppProps, IAppStateProps, IAppActionsProps };
