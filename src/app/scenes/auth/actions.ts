import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { UserRoleType } from '@core/services/Auth';

const authActions = {
  signUpAsync: createAsyncAction('auth/SIGN_UP_REQUEST', 'auth/SIGN_UP_REQUEST_OK', 'auth/SIGN_UP_REQUEST_ERROR')<
    void,
    void,
    Error
  >(),
  signInAsync: createAsyncAction('auth/SIGN_IN_REQUEST', 'auth/SIGN_IN_REQUEST_OK', 'auth/SIGN_IN_REQUEST_ERROR')<
    void,
    UserRoleType,
    Error
  >(),
  signOut: createAction('SIGN_OUT', resolve => {
    return () => resolve();
  })
};

type TAuthActions = ActionType<typeof authActions>;

// FIXME
// actions.signInRequestError = (error: Error) => ({
//   type: 'auth/SIGN_IN_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// actions.signUpRequestError = (error: Error) => ({
//   type: 'auth/SIGN_UP_REQUEST_ERROR',
//   payload: error,
//   error: true
// });

export { authActions, TAuthActions };
