import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';

import { actions as authActions } from '@src/app/scenes/auth/actions';
import { actions } from '@src/app/scenes/app/actions';
import { selectAppState } from '@src/app/store/selectors';
import { Auth } from '@src/app/scenes/web/services/Auth';
//
// const redirectMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
//     if (action.type === getType(actions.redirect)) {
//       const path = action.payload || '/';
//       browserHistory.push(action.payload);
//     }
//     return next(action);
//   };
//
//   return middleware;
// }

const notAuthorizedAccessMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
  if (action.type === getType(actions.notAuthorizedAccess)) {
    next(action);
    dispatch(actions.redirect('/auth/signIn')); // TODO inject signInPath
    return;
  }

  return next(action);
};

const getAccessDeniedMiddleware = (authStore: Auth): Middleware => ({ dispatch, getState }) => next => action => {
  if (action.type === getType(actions.accessDenied)) {
    dispatch(actions.redirect('/')); // dispatch({ type:'ON_ERROR', payload: new Error('Нет прав доступа'), error: true });
    return next(action);
  } else if (action.type === getType(authActions.signOut)) {
    authStore.removeAccessToken().then(() => next(action));
  }

  return next(action);
};

const errorMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
  if (action.error && action.payload) {
    let errorMsg = action.payload.toString();
    if (action.payload instanceof SyntaxError) {
      errorMsg = '[client internal error]';
      console.log(action.payload);
    }

    if (selectAppState(getState()).errorMessage !== '') {
      if (errorMsg !== selectAppState(getState()).errorMessage) {
        errorMsg += '  \n  ' + selectAppState(getState()).errorMessage;
      }
      // console.log('errorMiddleware');
      selectAppState(getState()).errorMessage = errorMsg;
    } else {
      const exludedPrefix = '@@redux-form/'; // TODO
      if (action.type.slice(0, exludedPrefix.length) !== exludedPrefix) {
        // console.log('errorMiddleware');
        dispatch(actions.showError(errorMsg || action.type));
      }
    }
  }

  return next(action);
};

const getMiddlewares = (authStore: Auth): Middleware[] => [
  notAuthorizedAccessMiddleware,
  getAccessDeniedMiddleware(authStore),
  errorMiddleware
];

export { getMiddlewares };
