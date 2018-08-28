import React, { Component, Fragment, ReactNode, RefObject } from 'react';
import { Link, NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { AppBar, Button, Portal, Tab, Tabs, Toolbar } from '@material-ui/core';
import CSSModules, { InjectedCSSModuleProps } from 'react-css-modules';
import NavigationIcon from '@material-ui/icons/Navigation';

import { ErrorBoundary } from '@core/components/ErrorBoundary';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { WebContainer } from '@src/app/scenes/web/container';

import styles from './styles.css';

interface IDemosViewProps extends RouteComponentProps<any> {
  renderHome?: React.ComponentType;
  renderSemanticsBoxContainer?: React.ComponentType;
  appBarPortalTargetRef?: RefObject<HTMLDivElement>;
}

@CSSModules(styles, { allowMultiple: true })
class DemosView extends Component<IDemosViewProps & InjectedCSSModuleProps> {
  public render(): ReactNode {
    const {
      location,
      match,
      renderHome: Home,
      renderSemanticsBoxContainer: SemanticsBoxContainer,
      appBarPortalTargetRef
    } = this.props;

    // TODO tmp
    const tabValue =
      location.pathname.indexOf(`${match.url}/nlp`) !== -1
        ? 0
        : location.pathname.indexOf(`${match.url}/morphology`) !== -1
          ? 1
          : location.pathname.indexOf(`${match.url}/semantics`) !== -1
            ? 2
            : -1;

    return (
      <Fragment>
        {/*<AppBar position="static">*/}
        {/*<Toolbar>*/}
        {/*<NavLink*/}
        {/*styleName="nav-item"*/}
        {/*to={`${match.url}/web`}*/}
        {/*activeClassName="nav-item-selected"*/}
        {/*style={{ flexGrow: 1 }}*/}
        {/*>*/}
        {/*<Button color="inherit" component={'div'}>*/}
        {/*Web*/}
        {/*</Button>*/}
        {/*</NavLink>*/}
        {/*</Toolbar>*/}
        {/*</AppBar>*/}
        {!!appBarPortalTargetRef &&
          !!appBarPortalTargetRef.current && (
            <Portal container={appBarPortalTargetRef.current}>
              <Fragment>
                <Tabs value={tabValue} textColor="primary">
                  <Link to={`${this.props.match.url}/nlp`}>
                    <Tab label="NLP" />
                  </Link>
                  <Link to={`${this.props.match.url}/morphology`}>
                    <Tab label="Morphology" />
                  </Link>
                  <Link to={`${this.props.match.url}/semantics`}>
                    <Tab label="Semantics" />
                  </Link>
                </Tabs>
              </Fragment>
            </Portal>
          )}
        <div styleName="content" >
          <Switch>
            <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/nlp`} />
            <Route path={`${match.path}/nlp`} component={Home} />
            <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
            <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
            {/*<Route path={`${match.path}/web`} component={WebContainer} />*/}
            <Redirect from={`${match.path}/*`} to={`${match.path}/`} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export { DemosView, IDemosViewProps };
