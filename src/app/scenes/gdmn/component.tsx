import React, { Component, PureComponent, RefObject, SFC } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import {
  AppBar,
  Button,
  Collapse,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import CSSModules, { InjectedCSSModuleProps } from 'react-css-modules';
// @ts-ignore
import { Breadcrumbs } from 'react-breadcrumbs';

import styles from './styles.css';
import { TDataStoresState } from '@src/app/scenes/datastores/reducer';
import { BreadcrumbsProps, InjectedProps } from 'react-router-breadcrumbs-hoc';

interface IDemosViewActionsProps {
  signOut: () => void;
}

type TGdmnViewStateProps = TDataStoresState;

interface IGdmnViewProps extends IDemosViewActionsProps, TGdmnViewStateProps, InjectedProps {
  renderDataStoresViewContainer?: React.ComponentType;
  renderDatastoreViewContainer?: React.ComponentType;
  getDatastoreViewContainer: (appBarPortalTargetRef: RefObject<HTMLDivElement>) => React.ComponentType;
  loadDataStores: () => void; // TODO extract to container
}

const NotFoundView = () => <h2>GDMN: 404!</h2>;

@CSSModules(styles, { allowMultiple: true })
class GdmnView extends PureComponent<IGdmnViewProps & RouteComponentProps<any> & InjectedCSSModuleProps> {
  private appBarPortalTargetRef: RefObject<HTMLDivElement> = React.createRef();

  public render() {
    const {
      match,
      renderDataStoresViewContainer: DataStoresViewContainer,
      renderDatastoreViewContainer: DatastoreViewContainer,
      getDatastoreViewContainer,
      signOut,
      dataStores,
      breadcrumbs
    } = this.props;
    return (
      <div styleName="layout">
        <AppBar styleName="header" position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap={true}>
              GDMN
            </Typography>
          </Toolbar>
          <div styleName={'breadcrumbs'}>
            {breadcrumbs.map((breadcrumb: BreadcrumbsProps, index: number) => (
              <Typography variant="subheading" color="inherit" noWrap={true} key={breadcrumb.key}>
                <NavLink to={breadcrumb.props.match.url}>
                  <Button styleName={'btn'} color="inherit" component={'div'}>
                    {breadcrumb}
                  </Button>
                </NavLink>
                {index < breadcrumbs.length - 1 && (
                  <Button style={{ padding: 0 }} disabled={true} styleName={'btn'} color="inherit" component={'div'}>
                    <i> ❯ </i>
                  </Button>
                )}
              </Typography>
            ))}
          </div>
          <div id="portalTarget" ref={this.appBarPortalTargetRef} />
        </AppBar>
        <Drawer styleName="nav" variant="permanent" anchor="left">
          <div style={{ minHeight: 64 }} />
          <Divider />
          <List style={{ width: 240 }}>
            <NavLink to={`${match.url}/datastores`} activeClassName={'gdmn-nav-item-selected'}>
              <ListItem button={true}>
                <ListItemIcon>
                  <Icon>dns</Icon>
                </ListItemIcon>
                <ListItemText primary="Datastores" />
                {/*{true ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}*/}
              </ListItem>
            </NavLink>
            <Collapse in={true} timeout="auto" unmountOnExit={true}>
              <List component="div" disablePadding={true}>
                {dataStores &&
                  dataStores.map(app => (
                    <NavLink
                      key={app.uid}
                      to={`${match.url}/datastores/${app.uid}`}
                      activeClassName={'gdmn-nav-item-selected'}
                    >
                      <ListItem button={true} dense={true} styleName={'gdmn-nav-item-nested'}>
                        <ListItemIcon>
                          <Icon>storage</Icon>
                        </ListItemIcon>
                        <ListItemText inset={true} primary={app.alias} />
                      </ListItem>
                    </NavLink>
                  ))}
              </List>
            </Collapse>
          </List>
          {/*<Divider/>*/}
          {/*<List style={{ width: 240 }}>*/}
          {/*<NavLink to={`${match.path}/profile`} activeClassName={'nav-item-selected'}>*/}
          {/*<ListItem button={true}>*/}
          {/*<ListItemIcon>*/}
          {/*<Icon>account_circle</Icon>*/}
          {/*</ListItemIcon>*/}
          {/*<ListItemText primary="Profile" />*/}
          {/*</ListItem>*/}
          {/*</NavLink>*/}
          {/*<NavLink to={`${match.path}/account`} activeClassName={'nav-item-selected'}>*/}
          {/*<ListItem button={true}>*/}
          {/*<ListItemIcon>*/}
          {/*<Icon>alternate_email</Icon>*/}
          {/*</ListItemIcon>*/}
          {/*<ListItemText primary="Account" />*/}
          {/*</ListItem>*/}
          {/*</NavLink>*/}
          {/*<NavLink to={`${match.path}/orgs`} activeClassName={'nav-item-selected'}>*/}
          {/*<ListItem button={true}>*/}
          {/*<ListItemIcon>*/}
          {/*<Icon>supervised_user_circle</Icon>*/}
          {/*</ListItemIcon>*/}
          {/*<ListItemText primary="Organizations" />*/}
          {/*</ListItem>*/}
          {/*</NavLink>*/}
          {/*</List>*/}
          <Divider />
          <List style={{ width: 240 }}>
            <ListItem button={true} onClick={signOut}>
              <ListItemIcon>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <main styleName="scene-pad">
          <Switch>
            <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/datastores`} />
            <Route exact={true} path={`${match.path}/datastores`} component={DataStoresViewContainer} />
            <Route
              path={`${match.path}/datastores/:appId`}
              component={getDatastoreViewContainer(this.appBarPortalTargetRef)}
            />
            <Route path={`${match.path}/*`} component={NotFoundView} />
          </Switch>
        </main>
        <footer />
      </div>
    );
  }
}

export { GdmnView, IGdmnViewProps, TGdmnViewStateProps };
