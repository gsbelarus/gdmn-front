import { ActionType, createAction } from 'typesafe-actions';

import { IAppCreateResponse } from '@core/gdmn-api/app/IAppCreateResponse';
import { IAppDeleteResponse } from '@core/gdmn-api/app/IAppDeleteResponse';
import { TAppGetResponse } from '@core/gdmn-api/app/TAppGetResponse';

const dataStoresActions = {
  // load
  loadDataStoresRequest: createAction('gdmn/datastores/LOAD_DATA_STORES_REQUEST', resolve => {
    return () => resolve();
  }),
  loadDataStoresRequestOk: createAction('gdmn/datastores/LOAD_DATA_STORES_REQUEST_OK', resolve => {
    return (data: TAppGetResponse) => resolve(data);
  }),
  loadDataStoresRequestError: createAction('gdmn/datastores/LOAD_DATA_STORES_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // delete
  deleteDataStoreRequest: createAction('gdmn/datastores/DELETE_DATA_STORE_REQUEST', resolve => {
    return () => resolve();
  }),
  deleteDataStoreRequestOk: createAction('gdmn/datastores/DELETE_DATA_STORE_REQUEST_OK', resolve => {
    return (data: IAppDeleteResponse) => resolve(data);
  }),
  deleteDataStoreRequestError: createAction('gdmn/datastores/DELETE_DATA_STORE_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // create
  createDataStoreRequest: createAction('gdmn/datastores/CREATE_DATA_STORE_REQUEST', resolve => {
    return () => resolve();
  }),
  createDataStoreRequestOk: createAction('gdmn/datastores/CREATE_DATA_STORE_REQUEST_OK', resolve => {
    return (data: IAppCreateResponse) => resolve();
  }),
  createDataStoreRequestError: createAction('gdmn/datastores/CREATE_DATA_STORE_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  })
};

type TDataStoresActions = ActionType<typeof dataStoresActions>;

// FIXME
dataStoresActions.loadDataStoresRequestError = (error: Error) => ({
  type: 'gdmn/datastores/LOAD_DATA_STORES_REQUEST_ERROR',
  payload: error,
  error: true
});
dataStoresActions.deleteDataStoreRequestError = (error: Error) => ({
  type: 'gdmn/datastores/DELETE_DATA_STORE_REQUEST_ERROR',
  payload: error,
  error: true
});
dataStoresActions.createDataStoreRequestError = (error: Error) => ({
  type: 'gdmn/datastores/CREATE_DATA_STORE_REQUEST_ERROR',
  payload: error,
  error: true
});

export { dataStoresActions, TDataStoresActions };
