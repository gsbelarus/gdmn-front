import { ActionType, createAction } from 'typesafe-actions';

import { UserRoleType } from '@core/services/Auth';

const actions = {
  signUpRequest: createAction('auth/SIGN_UP_REQUEST', resolve => {
    return () => resolve();
  }),
  signUpRequestOk: createAction('auth/SIGN_UP_REQUEST_OK', resolve => {
    return () => resolve();
  }),
  signUpRequestError: createAction('auth/SIGN_UP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  signInRequest: createAction('auth/SIGN_IN_REQUEST', resolve => {
    return () => resolve();
  }),
  signInRequestOk: createAction('auth/SIGN_IN_REQUEST_OK', resolve => {
    return (userRole: UserRoleType) => resolve({ userRole });
  }),
  signInRequestError: createAction('auth/SIGN_IN_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  signOut: createAction('SIGN_OUT', resolve => {
    return () => resolve();
  })
};

type TAuthActions = ActionType<typeof actions>;

// FIXME
actions.signInRequestError = (error: Error) => ({
  type: 'auth/SIGN_IN_REQUEST_ERROR',
  payload: error,
  error: true
});
actions.signUpRequestError = (error: Error) => ({
  type: 'auth/SIGN_UP_REQUEST_ERROR',
  payload: error,
  error: true
});

export { actions, TAuthActions };
