import React, { Component, ReactType } from 'react';
import { Link, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Tab, Tabs } from '@material-ui/core';

interface IDatastoreViewProps extends RouteComponentProps<any> {
  renderERModelBoxContainer?: React.ComponentType;
}

class DatastoreView extends Component<IDatastoreViewProps> {
  public render() {
    const { match, renderERModelBoxContainer: ERModelBoxContainer } = this.props;

    // TODO tmp
    const tabValue =
      location.pathname.indexOf(`${match.path}/ermodel`) !== -1
        ? 0
        : location.pathname.indexOf(`${match.path}/backups`) !== -1
          ? 1
          : 0;

    return (
      <div>
        <Tabs value={tabValue} indicatorColor="primary" textColor="primary" scrollable={true} scrollButtons="auto">
          <Link to={`${match.url}/ermodel`}>
            <Tab label="Data Viewer" />
          </Link>
          <Link to={`${match.url}/backups`}>
            <Tab label="Backups" />
          </Link>
        </Tabs>
        <Switch>
          <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/ermodel`} />
          <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
          {/*<Route path={`${match.path}/backups`} component={ERModelBoxContainer}/>*/}
          {/*<Redirect from={`${match.path}/*`} to={`${match.path}/`} />*/}
        </Switch>
      </div>
    );
  }
}

export { DatastoreView, IDatastoreViewProps };
