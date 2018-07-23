import { connect } from 'react-redux';

import { IProtectedRouteProps, IProtectedRouteStateProps, ProtectedRoute } from '@core/components/ProtectedRoute';
import { selectAuthState } from '@src/app/store/selectors';
import { IRootState } from '@src/app/store/rootReducer';

const ProtectedRouteContainer = connect(
  (state: IRootState, ownProps: IProtectedRouteProps): IProtectedRouteStateProps => ({
    userRole: selectAuthState(state).userRole,
    authenticated: selectAuthState(state).authenticated,
    signInPath: '/auth/signIn'
  })
)(ProtectedRoute);

export { ProtectedRouteContainer };
