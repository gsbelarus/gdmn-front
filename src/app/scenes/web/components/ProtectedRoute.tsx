import React, { SFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { UserRoleType } from '@src/app/scenes/web/services/Auth';
import { connect } from 'react-redux';
import { IRootState } from '@src/app/store/rootReducer';
import { selectAuthState } from '@src/app/store/selectors';

const enum RouteAccessLevelType {
  PUBLIC,
  PRIVATE_ANONYM,
  PROTECTED_USER,
  PROTECTED_ADMIN,
  PROTECTED_DEVELOPER
}

/**
 * PUBLIC: any role
 * PROTECTED: role >=
 * PRIVATE: role =
 */
const routeAccessLevels = {
  [RouteAccessLevelType.PUBLIC]: [UserRoleType.ANONYM, UserRoleType.USER, UserRoleType.ADMIN, UserRoleType.DEVELOPER],
  [RouteAccessLevelType.PRIVATE_ANONYM]: [UserRoleType.ANONYM],
  [RouteAccessLevelType.PROTECTED_USER]: [UserRoleType.USER, UserRoleType.ADMIN, UserRoleType.DEVELOPER],
  [RouteAccessLevelType.PROTECTED_ADMIN]: [UserRoleType.ADMIN, UserRoleType.DEVELOPER],
  [RouteAccessLevelType.PROTECTED_DEVELOPER]: [UserRoleType.DEVELOPER]
}; // TODO: bitMask

function checkAccess(routeAccessLevel: RouteAccessLevelType, userRole: UserRoleType) {
  return routeAccessLevels[routeAccessLevel].includes(userRole);
}

interface IProtectedRouteStateProps {
  userRole?: UserRoleType;
  authenticated?: boolean;
}

// interface IProtectedRouteActionsProps {
//   onNotAuthorizedAccess: (location: string) => void;
//   onAccessDenied: (location: string) => void;
// }

interface IProtectedRouteProps extends RouteProps, IProtectedRouteStateProps {
  // , IProtectedRouteActionsProps
  accessLevel: RouteAccessLevelType;
}

const ProtectedRoute: SFC<IProtectedRouteProps> = ({
  accessLevel,
  userRole,
  authenticated,
  // onNotAuthorizedAccess,
  // onAccessDenied,
  component: Component,
  ...routeProps
}) => {
  if (!Component) return null; // TODO

  return (
    <Route
      {...routeProps}
      render={props => {
        if (!checkAccess(accessLevel, userRole!)) {
          if (!authenticated) {
            // onNotAuthorizedAccess(props.location.pathname);
            return (
              <Redirect
                to={{
                  pathname: '/auth/signIn',
                  state: { from: props.location.pathname }
                }}
              />
            );
          }
          // onAccessDenied(props.location.pathname);
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location.pathname }
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};

const ProtectedRouteContainer = connect(
  (state: IRootState, ownProps: IProtectedRouteProps): IProtectedRouteStateProps => ({
    userRole: selectAuthState(state).userRole,
    authenticated: selectAuthState(state).authenticated
  })
)(ProtectedRoute);

export { ProtectedRouteContainer, RouteAccessLevelType };
