import React, { Component } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import {
  AppBar,
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

interface IGdmnViewProps extends RouteComponentProps<any>, IDemosViewActionsProps {
  renderAppsViewContainer?: React.ComponentType;
  renderERModelBoxContainer?: React.ComponentType;
}

interface IDemosViewActionsProps {
  signOut: () => void;
}

const NotFoundView = () => <h2>GDMN: 404!</h2>;

@CSSModules(styles, { allowMultiple: true })
class GdmnView extends Component<IGdmnViewProps & InjectedCSSModuleProps> {
  public render() {
    const {
      match,
      renderAppsViewContainer: AppsViewContainer,
      renderERModelBoxContainer: ERModelBoxContainer,
      signOut
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
            <NavLink to={`${match.path}/apps`} activeClassName={'nav-item-selected'}>
              <ListItem button={true}>
                <ListItemIcon>
                  <Icon>storage</Icon>
                </ListItemIcon>
                <ListItemText primary="Applications" />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List style={{ width: 240 }}>
            <ListItem button={true} onClick={signOut}>
              <ListItemIcon>
                <Icon>input</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <main styleName="main scene-pad">
          <Switch>
            <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/apps`} />
            <Route exact={true} path={`${match.path}/apps`} component={AppsViewContainer} />
            <Route path={`${match.path}/apps/:appId/ermodel`} component={ERModelBoxContainer} />
            <Route path={`${match.path}/*`} component={NotFoundView} />
          </Switch>
        </main>
      </div>
    );
  }
}

export { GdmnView, IGdmnViewProps };
