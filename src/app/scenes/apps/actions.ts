import { ActionType, createAction } from 'typesafe-actions';

import { IAppCreateResponse } from '@core/gdmn-api/app/IAppCreateResponse';
import { IAppDeleteResponse } from '@core/gdmn-api/app/IAppDeleteResponse';
import { TAppGetResponse } from '@core/gdmn-api/app/TAppGetResponse';

const appsActions = {
  // load apps
  loadAppsRequest: createAction('gdmn/apps/LOAD_APPS_REQUEST', resolve => {
    return () => resolve();
  }),
  loadAppsRequestOk: createAction('gdmn/apps/LOAD_APPS_REQUEST_OK', resolve => {
    return (data: TAppGetResponse) => resolve(data);
  }),
  loadAppsRequestError: createAction('gdmn/apps/LOAD_APPS_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // delete demos
  deleteAppRequest: createAction('gdmn/apps/DELETE_APP_REQUEST', resolve => {
    return () => resolve();
  }),
  deleteAppRequestOk: createAction('gdmn/apps/DELETE_APP_REQUEST_OK', resolve => {
    return (data: IAppDeleteResponse) => resolve(data);
  }),
  deleteAppRequestError: createAction('gdmn/apps/DELETE_APP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // create demos
  createAppRequest: createAction('gdmn/apps/CREATE_APP_REQUEST', resolve => {
    return () => resolve();
  }),
  createAppRequestOk: createAction('gdmn/apps/CREATE_APP_REQUEST_OK', resolve => {
    return (data: IAppCreateResponse) => resolve();
  }),
  createAppRequestError: createAction('gdmn/apps/CREATE_APP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  })
};

type TAppsActions = ActionType<typeof appsActions>;

// FIXME
appsActions.loadAppsRequestError = (error: Error) => ({
  type: 'gdmn/apps/LOAD_APPS_REQUEST_ERROR',
  payload: error,
  error: true
});
appsActions.deleteAppRequestError = (error: Error) => ({
  type: 'gdmn/apps/DELETE_APP_REQUEST_ERROR',
  payload: error,
  error: true
});
appsActions.createAppRequestError = (error: Error) => ({
  type: 'gdmn/apps/CREATE_APP_REQUEST_ERROR',
  payload: error,
  error: true
});

export { appsActions, TAppsActions };
