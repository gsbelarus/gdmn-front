import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';
import { startSubmit, stopSubmit } from 'redux-form';

import { Auth, UserRoleType } from '@core/services/Auth';
import { UnauthorizedError } from '@core/errors/httpErrors';
import { authActions } from '@src/app/scenes/auth/actions';

const getSignInMiddleware = (authStore: Auth): Middleware => ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case getType(authActions.signInAsync.request):
      dispatch(startSubmit('SignInForm'));
      break;
    case getType(authActions.signInAsync.success):
      console.log('actions.signInRequestOk');
      // dispatch(reset('SignInForm'));
      dispatch(stopSubmit('SignInForm'));

      if (!action.payload) break;

      if (action.payload === UserRoleType.USER) {
        // todo save userrole
        // authStore.storeTokens(action.payload.acc, action.payload.refresh_token).then(() => {
        next(action);
        //   // dispatch({ type: 'REDIRECT', payload: '/demos' }); // TODO
        //   // return;
        // });
      } else {
        dispatch({ type: 'ON_ERROR', payload: new Error('Нет прав доступа'), error: true }); // TODO action
        next(action);
      }
      return;
    case authActions.signInAsync.failure(new Error()).type: // getType(ermodelActions.signInRequestError):
      // dispatch(reset('SignInForm'));
      dispatch(stopSubmit('SignInForm'));
      if (action.payload && action.payload.fields) {
        // TODO
        // throw new SubmissionError( { [action.payload.fieldName]:  action.payload.toString() } );
        // TODO action.payload.message = action.payload.toString();
      }
      // else if (action.payload instanceof UnauthorizedError) {
      //   // TODO
      //   action.payload.message = 'Invalid username or password!';
      // }
      break;
  }

  return next(action);
};

const getSignOutMiddleware = (authStore: Auth): Middleware => ({ dispatch, getState }) => next => action => {
  if (action.type === getType(authActions.signOut)) {
    // todo remove userrole
    authStore.removeTokens().then(() => {
      next(action);
      // dispatch({ type: 'REDIRECT', payload: '/auth/signIn' }); // TODO
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
