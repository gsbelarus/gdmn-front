import React, { Component } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import {
  AppBar,
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

import styles from './styles.css';
import { TDataStoresState } from '@src/app/scenes/datastores/reducer';

interface IDemosViewActionsProps {
  signOut: () => void;
}

type TGdmnViewStateProps = TDataStoresState;

interface IGdmnViewProps extends RouteComponentProps<any>, IDemosViewActionsProps, TGdmnViewStateProps {
  renderDataStoresViewContainer?: React.ComponentType;
  renderDatastoreViewContainer?: React.ComponentType;

  loadDataStores: () => void; // TODO extract to container
}

const NotFoundView = () => <h2>GDMN: 404!</h2>;

@CSSModules(styles, { allowMultiple: true })
class GdmnView extends Component<IGdmnViewProps & InjectedCSSModuleProps> {
  public render() {
    const {
      match,
      renderDataStoresViewContainer: DataStoresViewContainer,
      renderDatastoreViewContainer: DatastoreViewContainer,
      signOut,
      dataStores
    } = this.props;
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          width: '100%',
          zIndex: 1,
          overflow: 'hidden',
          position: 'relative',
          paddingTop: 64
        }}
      >
        <AppBar position="absolute" style={{ marginLeft: 240, right: 'auto' }}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap={true}>
              GDMN
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          style={{
            width: 240,
            position: 'relative'
          }}
          variant="permanent"
          anchor="left"
        >
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
                      to={`${match.url}/datastores/${app.uid}/ermodel`}
                      activeClassName={'gdmn-nav-item-selected'}
                    >
                      <ListItem button={true} className="gdmn-nav-item-nested" dense={true}>
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
        <main styleName="main scene-pad">
          <Switch>
            <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/datastores`} />
            <Route exact={true} path={`${match.path}/datastores`} component={DataStoresViewContainer} />
            <Route path={`${match.path}/datastores/:appId`} component={DatastoreViewContainer} />
            <Route path={`${match.path}/*`} component={NotFoundView} />
          </Switch>
        </main>
      </div>
    );
  }
}

export { GdmnView, IGdmnViewProps, TGdmnViewStateProps };
