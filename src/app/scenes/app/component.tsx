import React, { Component, Fragment, ReactNode } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import CSSModules, { InjectedCSSModuleProps } from 'react-css-modules';

import { ErrorBoundary } from '@core/components/ErrorBoundary';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { WebContainer } from '@src/app/scenes/web/container';

import styles from './styles.css';

interface IAppActionsProps {
  signOut: () => void;
}

interface IAppProps extends RouteComponentProps<any>, IAppActionsProps {
  renderHome?: React.ComponentType;
  renderSemanticsBoxContainer?: React.ComponentType;
  renderERModelBoxContainer?: React.ComponentType;
  renderAppsBoxContainer?: React.ComponentType;
}

@CSSModules(styles, { allowMultiple: true })
class App extends Component<IAppProps & InjectedCSSModuleProps> {
  public render(): ReactNode {
    const {
      location,
      match,
      renderHome: Home,
      renderSemanticsBoxContainer: SemanticsBoxContainer,
      renderERModelBoxContainer: ERModelBoxContainer,
      renderAppsBoxContainer: AppsBoxContainer,
      signOut
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
            <NavLink styleName="nav-item" to={`${match.url}/apps`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                Apps
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
        <main styleName={location.pathname !== match.path ? 'main scene-pad' : 'main'}>
          <ErrorBoundary>
            <Switch>
              <Route exact={true} path={`${match.path}/`} component={Home} />
              <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
              <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
              <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
              <Route path={`${match.path}/web`} component={WebContainer} />
              <Route path={`${match.path}/apps`} component={AppsBoxContainer} />
              <Redirect from={`${match.path}/*`} to={`${match.path}`} />
            </Switch>
          </ErrorBoundary>
        </main>
      </Fragment>
    );
  }
}

export { App, IAppProps, IAppActionsProps };
