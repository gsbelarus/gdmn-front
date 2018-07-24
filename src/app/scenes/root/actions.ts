import { ActionType, createAction } from 'typesafe-actions';

const rootActions = {
  onNotAuthorizedAccess: createAction('ON_NOT_AUTHORIZED_ACCESS', resolve => {
    return (refererPath: string) => resolve(refererPath);
  }),
  onAccessDenied: createAction('ON_ACCESS_DENIED', resolve => {
    return (refererPath: string) => resolve(refererPath);
  }),
  onError: createAction('ON_ERROR', resolve => {
    return (error: Error, meta?: any) => resolve(error, meta);
  }),
  showMessage: createAction('SHOW_MESSAGE', resolve => {
    return (message: string) => resolve(message);
  }),
  hideMessage: createAction('snackbar/HIDE_MESSAGE', resolve => {
    return () => resolve();
  })
  // redirect: createAction('REDIRECT', resolve => {
  //   return (toPath: string) => resolve(toPath);
  // }),
};

type TRootActions = ActionType<typeof rootActions>;

// FIXME
rootActions.onError = (error: Error, meta?: any) => ({ type: 'ON_ERROR', payload: error, error: true, meta });

export { rootActions, TRootActions };
