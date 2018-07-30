import { connect } from 'react-redux';

import { IProtectedRouteProps, IProtectedRouteStateProps, ProtectedRoute } from '@core/components/ProtectedRoute';
import { selectAuthState } from '@src/app/store/selectors';
import { IState } from '@src/app/store/reducer';

const ProtectedRouteContainer = connect(
  (state: IState, ownProps: IProtectedRouteProps): IProtectedRouteStateProps => ({
    userRole: selectAuthState(state).userRole,
    authenticated: selectAuthState(state).authenticated,
    defaultAnonymPath: '/gdmn/auth/signIn',
    defaultUserPath: '/gdmn'
  })
)(ProtectedRoute);

export { ProtectedRouteContainer };
