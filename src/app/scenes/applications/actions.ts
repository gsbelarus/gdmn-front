import { ActionType, createAction } from 'typesafe-actions';

import { IAppCreateResponse } from '@core/api/app/IAppCreateResponse';
import { IAppDeleteResponse } from '@core/api/app/IAppDeleteResponse';
import { TAppGetResponse } from '@core/api/app/TAppGetResponse';

const actions = {
  // load apps
  loadAppsRequest: createAction('app/applications/LOAD_APPS_REQUEST', resolve => {
    return () => resolve();
  }),
  loadAppsRequestOk: createAction('app/applications/LOAD_APPS_REQUEST_OK', resolve => {
    return (data: TAppGetResponse) => resolve(data);
  }),
  loadAppsRequestError: createAction('app/applications/LOAD_APPS_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // delete app
  deleteAppRequest: createAction('app/applications/DELETE_APP_REQUEST', resolve => {
    return () => resolve();
  }),
  deleteAppRequestOk: createAction('app/applications/DELETE_APP_REQUEST_OK', resolve => {
    return (data: IAppDeleteResponse) => resolve(data);
  }),
  deleteAppRequestError: createAction('app/applications/DELETE_APP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // create app
  createAppRequest: createAction('app/applications/CREATE_APP_REQUEST', resolve => {
    return () => resolve();
  }),
  createAppRequestOk: createAction('app/applications/CREATE_APP_REQUEST_OK', resolve => {
    return (data: IAppCreateResponse) => resolve();
  }),
  createAppRequestError: createAction('app/applications/CREATE_APP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  })
};

type TAppsActions = ActionType<typeof actions>;

// FIXME
actions.loadAppsRequestError = (error: Error) => ({
  type: 'app/applications/LOAD_APPS_REQUEST_ERROR',
  payload: error,
  error: true
});
actions.deleteAppRequestError = (error: Error) => ({
  type: 'app/applications/DELETE_APP_REQUEST_ERROR',
  payload: error,
  error: true
});
actions.createAppRequestError = (error: Error) => ({
  type: 'app/applications/CREATE_APP_REQUEST_ERROR',
  payload: error,
  error: true
});

export { actions, TAppsActions };
