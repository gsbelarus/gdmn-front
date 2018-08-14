import React, { Component, ComponentType, Fragment, PureComponent, RefObject } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { Breadcrumb } from 'react-breadcrumbs';
import CSSModules from 'react-css-modules';
import { Link, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Portal, Tab, Tabs } from '@material-ui/core';
import { backupActions } from '@src/app/scenes/backups/actions';
import { dataStoresActions } from '@src/app/scenes/datastores/actions';

interface IDatastoreViewProps extends RouteComponentProps<any> {
  renderBackupsContainer?: React.ComponentType;
  renderERModelBoxContainer?: React.ComponentType;
  appBarPortalTargetRef?: RefObject<HTMLDivElement>;
}

class DatastoreView extends PureComponent<IDatastoreViewProps> {
  // constructor(props) {
  //   super(props);
  //   this.el = document.createDocumentFragment() // document.createElement('span');
  // }

  // componentDidMount() {
  //   const { portalSelector } = this.props;
  //   document.getElementById(portalSelector).appendChild(this.el);
  // }
  //
  // componentWillUnmount() {
  //   const { portalSelector } = this.props;
  //   document.getElementById(portalSelector).removeChild(this.el);
  // }

  public render() {
    const {
      match,
      renderERModelBoxContainer: ERModelBoxContainer,
      renderBackupsContainer: BackupsContainer,
      appBarPortalTargetRef
    } = this.props;

    // TODO tmp
    const tabValue =
      location.pathname.indexOf(`${match.url}/ermodel`) !== -1
        ? 0
        : location.pathname.indexOf(`${match.url}/backups`) !== -1
          ? 1
          : -1;

    return (
      <div>
        <Breadcrumb
          data={{
            title: 'appId',
            pathname: match.url
          }}
        />
        {!!appBarPortalTargetRef &&
          !!appBarPortalTargetRef.current && (
            <Portal container={appBarPortalTargetRef.current}>
              <Fragment>
                <Tabs value={tabValue} textColor="primary">
                  <Link to={`${this.props.match.url}/ermodel`}>
                    <Tab label="Data Viewer" />
                  </Link>
                  <Link to={`${this.props.match.url}/backups`}>
                    <Tab label="Backup Manager" />
                  </Link>
                </Tabs>
              </Fragment>
            </Portal>
          )}
        <Switch>
          <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/backups`} />
          <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
          <Route path={`${match.path}/backups`} component={BackupsContainer} />
          {/*<Redirect from={`${match.path}/*`} to={`${match.path}/`} />*/}
        </Switch>
      </div>
    );
  }
}

export { DatastoreView, IDatastoreViewProps };
