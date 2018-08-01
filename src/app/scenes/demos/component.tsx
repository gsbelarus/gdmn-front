import React, { Component, Fragment, ReactNode } from 'react';
import { Link, NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import CSSModules, { InjectedCSSModuleProps } from 'react-css-modules';
import NavigationIcon from '@material-ui/icons/Navigation';

import { ErrorBoundary } from '@core/components/ErrorBoundary';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { WebContainer } from '@src/app/scenes/web/container';

import styles from './styles.css';

interface IDemosViewProps extends RouteComponentProps<any> {
  renderHome?: React.ComponentType;
  renderSemanticsBoxContainer?: React.ComponentType;
}

@CSSModules(styles, { allowMultiple: true })
class DemosView extends Component<IDemosViewProps & InjectedCSSModuleProps> {
  public render(): ReactNode {
    const { location, match, renderHome: Home, renderSemanticsBoxContainer: SemanticsBoxContainer } = this.props;

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <NavLink styleName="nav-item" to={`${match.url}/nlp`} activeClassName="nav-item-selected">
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
            <Link styleName="nav-item" to={`/spa/gdmn`}>
              <Button variant="extendedFab" aria-label="Delete" color="primary">
                <NavigationIcon style={{ marginRight: 8 }} />
                GDMN-app
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <main styleName={location.pathname !== `${match.path}/nlp` ? 'main scene-pad' : 'main'}>
          <ErrorBoundary>
            <Switch>
              <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/nlp`} />
              <Route path={`${match.path}/nlp`} component={Home} />
              <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
              <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
              <Route path={`${match.path}/web`} component={WebContainer} />
              <Redirect from={`${match.path}/*`} to={`${match.path}/`} />
            </Switch>
          </ErrorBoundary>
        </main>
      </Fragment>
    );
  }
}

export { DemosView, IDemosViewProps };
