import { Middleware } from 'redux';

import { selectRootState } from '@src/app/store/selectors';
import { rootActions } from '@src/app/scenes/root/actions';

const errorMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
  if (action.error && action.payload) {
    let errorMsg = action.payload.toString();
    if (action.payload instanceof SyntaxError) {
      errorMsg = '[client internal error]';
      console.log(action.payload);
    }

    if (selectRootState(getState()).errorMessage !== '') {
      if (errorMsg !== selectRootState(getState()).errorMessage) {
        errorMsg += '  \n  ' + selectRootState(getState()).errorMessage;
      }
      // console.log('errorMiddleware');
      selectRootState(getState()).errorMessage = errorMsg;
    } else {
      const exludedPrefix = '@@redux-form/'; // TODO
      if (action.type.slice(0, exludedPrefix.length) !== exludedPrefix) {
        // console.log('errorMiddleware');
        dispatch(rootActions.showError(errorMsg || action.type));
      }
    }
  }

  return next(action);
};

const middlewares: Middleware[] = [errorMiddleware];

export { middlewares };

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

// const notAuthorizedAccessMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
//   if (action.type === getType(actions.notAuthorizedAccess)) {
//     next(action);
//     dispatch(actions.redirect('/auth/signIn')); // TODO inject signInPath
//     return;
//   }
//
//   return next(action);
// };
//
// const getAccessDeniedMiddleware = (authStore: Auth): Middleware => ({ dispatch, getState }) => next => action => {
//   if (action.type === getType(actions.accessDenied)) {
//     dispatch(actions.redirect('/')); // dispatch({ type:'ON_ERROR', payload: new Error('Нет прав доступа'), error: true });
//     return next(action);
//   } else if (action.type === getType(authActions.signOut)) {
//     authStore.removeAccessToken().then(() => next(action));
//   }
//
//   return next(action);
// };
