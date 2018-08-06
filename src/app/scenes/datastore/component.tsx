import React, { Component, ComponentType, Fragment, PureComponent, RefObject } from 'react';
import ReactDOM from 'react-dom';

import { Link, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Tab, Tabs } from '@material-ui/core';

interface IDatastoreViewProps extends RouteComponentProps<any> {
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
    const { match, renderERModelBoxContainer: ERModelBoxContainer, appBarPortalTargetRef } = this.props;

    // TODO tmp
    const tabValue =
      location.pathname.indexOf(`${match.url}/ermodel`) !== -1
        ? 0
        : location.pathname.indexOf(`${match.url}/backups`) !== -1
          ? 1
          : -1;

    return (
      <div>
        <div id="portal">
          {!!appBarPortalTargetRef &&
            !!appBarPortalTargetRef.current &&
            ReactDOM.createPortal(
              <Fragment>
                <Tabs value={tabValue} textColor="primary" scrollable={true} scrollButtons="auto">
                  <Link to={`${this.props.match.url}/ermodel`}>
                    <Tab label="Data Viewer" />
                  </Link>
                  <Link to={`${this.props.match.url}/backups`}>
                    <Tab label="Backups" />
                  </Link>
                </Tabs>
              </Fragment>,
              appBarPortalTargetRef.current
            )}
        </div>

        <Switch>
          <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/ermodel`} />
          <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
          <Route path={`${match.path}/backups`} component={() => <div>backups</div>} />
          {/*<Redirect from={`${match.path}/*`} to={`${match.path}/`} />*/}
        </Switch>
      </div>
    );
  }
}

export { DatastoreView, IDatastoreViewProps };
