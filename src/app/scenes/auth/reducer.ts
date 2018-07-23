import { getType } from 'typesafe-actions';

import { UserRoleType } from '@core/services/Auth';
import { actions, TAuthActions } from '@src/app/scenes/auth/actions';

interface IAuthState {
  authenticated: boolean;
  accessToken?: string;
  userRole: UserRoleType;
}

const getReducer = (authInitialState: IAuthState) => (state: IAuthState = authInitialState, action: TAuthActions) => {
  switch (action.type) {
    case getType(actions.signInRequestOk): {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userRole: action.payload.userRole,
        authenticated: true
      };
    }
    case getType(actions.signOut): {
      return {
        ...state,
        accessToken: undefined,
        userRole: UserRoleType.ANONYM,
        authenticated: false
      };
    }
    default:
      return state;
  }
};

export { IAuthState, getReducer };
