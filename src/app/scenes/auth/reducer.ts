import { getType } from 'typesafe-actions';

import { UserRoleType } from '@core/services/Auth';
import { authActions, TAuthActions } from '@src/app/scenes/auth/actions';

interface IAuthState {
  authenticated: boolean;
  userRole: UserRoleType;
  // accessToken?: string;
  // accessTokenExpireTime?: number;
  // accessTokenIssuedAt?: number;
  // userId?: number;
}

const getReducer = (authInitialState: IAuthState) => (state: IAuthState = authInitialState, action: TAuthActions) => {
  switch (action.type) {
    case getType(authActions.signInAsync.success): {
      return {
        ...state,
        // accessToken: action.payload.accessToken,
        userRole: action.payload,
        authenticated: true
      };
    }
    // TODO case error
    case getType(authActions.signOut): {
      return {
        ...state,
        // accessToken: undefined,
        userRole: UserRoleType.ANONYM,
        authenticated: false
      };
    }
    default:
      return state;
  }
};

export { IAuthState, getReducer };
