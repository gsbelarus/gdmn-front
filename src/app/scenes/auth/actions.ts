import { ActionType, createAction } from 'typesafe-actions';

import { UserRoleType } from '@src/app/scenes/web/services/Auth';

const actions = {
  signInRequest: createAction('auth/SIGN_IN_REQUEST', resolve => {
    return () => resolve();
  }),
  signInRequestOk: createAction('auth/SIGN_IN_REQUEST_OK', resolve => {
    return (accessToken: string, userRole: UserRoleType) => resolve({ accessToken, userRole });
  }),
  signInRequestError: createAction('auth/SIGN_IN_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  signOut: createAction('auth/SIGN_OUT', resolve => {
    return () => resolve();
  })
};

type TAuthActions = ActionType<typeof actions>;

export { actions, TAuthActions };
