import { ActionType, createAction } from 'typesafe-actions';

const dialogActions = {
  addNLPDialogText: createAction('app/nlpdialog/ADD_NLPDIALOG_TEXT', resolve => {
    return (text: string) => resolve(text);
  })
};

const appActions = {
  notAuthorizedAccess: createAction('app/NOT_AUTHORIZED_ACCESS', resolve => {
    return (refererPath: string) => resolve(refererPath);
  }),
  accessDenied: createAction('app/ACCESS_DENIED', resolve => {
    return (refererPath: string) => resolve(refererPath);
  }),
  redirect: createAction('app/REDIRECT', resolve => {
    return (toPath: string) => resolve(toPath);
  }),
  onError: createAction('app/ON_ERROR', resolve => {
    return (error: Error, meta?: any) => resolve(error, meta);
  }),
  showError: createAction('app/SHOW_ERROR', resolve => {
    return (errorMessage: string) => resolve(errorMessage);
  }),
  hideError: createAction('app/HIDE_ERROR', resolve => {
    return () => resolve();
  })
};

type TNLPDialogActions = ActionType<typeof dialogActions>;
type TAppActions = ActionType<typeof appActions>;

// FIXME
appActions.onError = (error: Error, meta?: any) => ({ type: 'app/ON_ERROR', payload: error, error: true, meta });

const actions = { ...dialogActions, ...appActions };

export { actions, TNLPDialogActions, TAppActions };
