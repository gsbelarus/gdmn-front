import React, { SFC } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

interface IGdmnViewProps extends RouteComponentProps<any> {
  renderAppsViewContainer?: React.ComponentType;
  renderERModelBoxContainer?: React.ComponentType;
}

const NotFoundView = () => <h2>GDMN: 404!</h2>;
const GdmnView: SFC<IGdmnViewProps> = ({
  match,
  renderAppsViewContainer: AppsViewContainer,
  renderERModelBoxContainer: ERModelBoxContainer
}) => (
  <Switch>
    <Redirect exact={true} from={`${match.path}/`} to={`${match.path}/apps`} />
    <Route exact={true} path={`${match.path}/apps`} component={AppsViewContainer} />
    <Route path={`${match.path}/apps/:appId/ermodel`} component={ERModelBoxContainer} />
    <Route path={`${match.path}/*`} component={NotFoundView} />
  </Switch>
);

export { GdmnView, IGdmnViewProps };


{/*<NavLink styleName="nav-item" to={`${match.url}/ermodel`} activeClassName="nav-item-selected">*/}
{/*<Button color="inherit" component={'div'}>*/}
{/*ER-Model*/}
{/*</Button>*/}
{/*</NavLink>*/}
{/*<NavLink styleName="nav-item" to={`/account/apps`} activeClassName="nav-item-selected">*/}
{/*<Button color="inherit" component={'div'}>*/}
{/*Apps*/}
{/*</Button>*/}
{/*</NavLink>*/}


{/*<Button color="inherit" component={'div'} onClick={signOut}>*/}
{/*Logout*/}
{/*</Button>*/}
