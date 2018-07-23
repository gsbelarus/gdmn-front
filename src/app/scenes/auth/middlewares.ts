import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';
import { startSubmit, stopSubmit } from 'redux-form';

import { Auth, UserRoleType } from '@core/services/Auth';
import { UnauthorizedError } from '@core/errors/httpErrors';
import { actions } from '@src/app/scenes/auth/actions';

const getSignInMiddleware = (authStore: Auth): Middleware => ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case getType(actions.signInRequest):
      dispatch(startSubmit('SignInForm'));
      break;
    case getType(actions.signInRequestOk):
      // dispatch(reset('SignInForm'));
      dispatch(stopSubmit('SignInForm'));

      if (!(action.payload && action.payload.accessToken)) break;

      if (action.payload.userRole === UserRoleType.USER) {
        // todo save userrole

        authStore.storeAccessToken(action.payload.accessToken).then(() => {
          next(action);
          dispatch({ type: 'REDIRECT', payload: '/app' }); // TODO
          // return;
        }); // FIXME await
      } else {
        dispatch({ type: 'ON_ERROR', payload: new Error('Нет прав доступа'), error: true }); // TODO action
        next(action);
      }
      return;
    case actions.signInRequestError(new Error()).type: // getType(actions.signInRequestError):
      // dispatch(reset('SignInForm'));
      dispatch(stopSubmit('SignInForm'));
      if (action.payload && action.payload.fields) {
        // TODO
        // throw new SubmissionError( { [action.payload.fieldName]:  action.payload.toString() } );
        action.payload.message = action.payload.toString();
      } else if (action.payload instanceof UnauthorizedError) {
        // TODO
        action.payload.message = 'Invalid username or password!';
      }
      break;
  }

  return next(action);
};

const getSignOutMiddleware = (authStore: Auth): Middleware => ({ dispatch, getState }) => next => action => {
  if (action.type === getType(actions.signOut)) {
    // todo remove userrole
    authStore.removeAccessToken().then(() => {
      next(action);
      dispatch({ type: 'REDIRECT', payload: '/auth/signIn' }); // TODO appActions
    });
    return;
  }

  return next(action);
};

const getMiddlewares = (authStore: Auth): Middleware[] => [
  getSignInMiddleware(authStore),
  getSignOutMiddleware(authStore)
];

export { getMiddlewares };
