import { Middleware } from 'redux';

import { selectRootState } from '@src/app/store/selectors';
import { rootActions } from '@src/app/scenes/root/actions';

const errorMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
  if (
    (action.error || action.payload instanceof Error) && // todo instanceof Error tmp
    action.payload
  ) {
    let errorMsg = action.payload.toString();
    if (action.payload instanceof SyntaxError) {
      errorMsg = '[client internal error]';
      console.log(action.payload);
    }

    // TODO Unauthorized -> logout

    if (selectRootState(getState()).snackbarMessage !== '') {
      // snackbar opened
      if (errorMsg !== selectRootState(getState()).snackbarMessage) {
        errorMsg += '  \n  ' + selectRootState(getState()).snackbarMessage;
      }
      selectRootState(getState()).snackbarMessage = errorMsg;
    } else {
      const exludedPrefix = '@@redux-form/'; // TODO
      if (action.type.slice(0, exludedPrefix.length) !== exludedPrefix) {
        dispatch(rootActions.showMessage(errorMsg || action.type)); // open snackbar
      }
    }
  }

  return next(action);
};

const rootMiddlewares: Middleware[] = [errorMiddleware];

export { rootMiddlewares };

// const redirectMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
//     if (action.type === getType(ermodelActions.redirect)) {
//       const path = action.payload || '/';
//       browserHistory.push(action.payload);
//     }
//     return next(action);
//   };
//
//   return middleware;
// }

// const notAuthorizedAccessMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
//   if (action.type === getType(ermodelActions.notAuthorizedAccess)) {
//     next(action);
//     dispatch(ermodelActions.redirect('/auth/signIn'));
//     return;
//   }
//
//   return next(action);
// };

// const getAccessDeniedMiddleware = (authStore: Auth): Middleware => ({ dispatch, getState }) => next => action => {
//   if (action.type === getType(ermodelActions.accessDenied)) {
//     dispatch(ermodelActions.redirect('/')); // dispatch({ type:'ON_ERROR', payload: new Error('Нет прав доступа'), error: true });
//     return next(action);
//   } else if (action.type === getType(authActions.signOut)) {
//     authStore.removeAccessToken().then(() => next(action));
//   }
//
//   return next(action);
// };
